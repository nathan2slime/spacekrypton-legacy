import { langs } from '@kry/i18n';
import { AppI18nLang } from '@kry/i18n';
import {
  Component,
  Host,
  h,
  Event,
  EventEmitter,
  State,
  Prop,
  Watch,
  Element,
  Listen,
} from '@stencil/core';

import { KryMapPoint } from '../../components/map/map.model';
import { Satellite, FavoriteSatelliteDetail, FilterSatellites } from './satellites.model';

@Component({
  tag: 'kry-satellites',
  styleUrl: 'satellites.styles.scss',
  shadow: true,
})
export class KrySatellites {
  @Prop() satellites: Satellite[] = [];
  @Prop() loading: boolean;
  @Prop() favorites: number[] = [];
  @Prop() filter: FilterSatellites[] = [];
  @Prop() language: AppI18nLang;
  @Prop() pathname: string;
  @Prop() type: '2D' | '3D' = '3D';
  @Prop() search: string;
  @Prop() currentFilter: FilterSatellites;

  @Event({ composed: false }) kryLocation: EventEmitter<false | GeolocationPosition>;
  @Event({ composed: false }) kryFallback: EventEmitter<boolean>;
  @Event({ composed: false }) kryChangeSearch: EventEmitter<string>;
  @Event({ composed: false }) kryRedirect: EventEmitter<string>;
  @Event({ composed: false }) krySearch: EventEmitter<boolean>;
  @Event({ composed: false }) kryFilter: EventEmitter<FilterSatellites>;
  @Event({ composed: false })
  kryFavoriteSatellite: EventEmitter<FavoriteSatelliteDetail>;
  @Event({ composed: false }) kryTrackSatellite: EventEmitter<number>;

  @State() location: GeolocationPosition;
  @State() points: KryMapPoint[] = [];
  @State() dialog: boolean;
  @State() loaded: boolean;
  @State() loading3D: boolean;

  @Element() host: HTMLKrySatellitesElement;

  watch: number;
  earthWrapper: HTMLDivElement;
  earth: any;
  map: HTMLKryMapElement;
  elDialog: HTMLKryDialogLocationElement;

  @Watch('location')
  listenLocation() {
    if (this.watch) {
      navigator.geolocation.clearWatch(this.watch);
    }
  }

  @Listen('pathname')
  listenRouteChange() {
    this.dialog = false;
  }

  @Watch('satellites')
  renderPoints() {
    this.loading3D = false;
    if (this.earth) this.earthWrapper.removeChild(this.earth);

    if (this.satellites) {
      this.loaded = true;

      this.points = this.satellites.map(satellite => {
        const { latitude: satlatitude, longitude: satlongitude } = satellite.positions[0];

        return {
          latlng: [satlatitude, satlongitude] as any,
          icon: 'ri-space-ship-fill',
          label: satellite.name,
          key: satellite.id,
        };
      });

      if (this.type == '3D') {
        this.loading3D = true;
        this.earth = document.createElement('earth-satellites-component');
        this.earthWrapper.appendChild(this.earth);

        this.earth.coordinates = this.getGlobalCoords();

        this.stopLoading3D();
      }
    }
  }

  @Watch('dialog')
  blockedLocation() {
    this.kryLocation.emit(false);

    if (!this.elDialog) {
      this.elDialog = document.createElement('kry-dialog-location');
      this.host.parentNode.appendChild(this.elDialog);

      this.elDialog.addEventListener('kryClose', () => {
        this.kryFallback.emit(true);
        this.dialog = false;
      });
      this.elDialog.addEventListener('kryRequestLocation', () => this.getLocation());
      this.elDialog.addEventListener('kryRedirect', (e: CustomEvent<string>) =>
        this.kryRedirect.emit(e.detail)
      );
    }

    this.elDialog.open = this.dialog;
  }

  getLocation = () => {
    if (navigator.geolocation) {
      this.watch = navigator.geolocation.watchPosition(
        el => {
          this.dialog = false;
          this.location = el;
          this.kryLocation.emit(el);
        },
        () => {
          this.dialog = true;
        }
      );
    } else {
      this.dialog = true;
    }
  };

  stopLoading3D = () => {
    setTimeout(() => (this.loading3D = false), 3000);
  };

  onFilter = (e: string) => {
    const filter = this.filter.find(({ key }) => key == e);
    this.kryFilter.emit(filter);
  };

  getGlobalCoords = () => {
    return this.satellites
      .map(satellite => {
        const { latitude: satlatitude, longitude: satlongitude } = satellite.positions[0];

        if (satlatitude == 0) return;

        return {
          coords: [
            {
              lat: satlatitude,
              long: satlongitude,
            },
          ],
        };
      })
      .filter(el => el != undefined);
  };

  componentDidLoad() {
    this.getLocation();
  }

  render() {
    const isLoading = this.dialog ? false : !this.loading ? !this.location : this.loading;

    const i18n = langs[this.language];

    return (
      <Host>
        <div class={{ wrapper: true, location: !!this.location, loading: isLoading }}>
          {this.type == '2D' && (
            <kry-map
              ref={el => (this.map = el)}
              latitude={this.location?.coords.latitude}
              onKryClickMarkMap={e => this.kryTrackSatellite.emit(e.detail)}
              longitude={this.location?.coords.longitude}
              points={this.points}
              markHome
            />
          )}

          {this.type == '3D' && (
            <div
              class={{ earth: true, loading: this.loading3D }}
              ref={el => (this.earthWrapper = el)}
            >
              <div>
                <slot name="3d" />
                {i18n.web.satellites.loading3d}
              </div>
            </div>
          )}

          <header>
            <div>
              <kry-icon name="ri-global-fill" />

              <h3>{i18n.web.satellites.title}</h3>
            </div>

            <div>
              <kry-select
                value={this.currentFilter}
                placeholder="Filter"
                options={this.filter}
                onKryChange={e => this.onFilter(e.detail)}
              />

              <kry-search
                value={this.search}
                onKrySearch={() => this.krySearch.emit(true)}
                onKryChangeValue={e => this.kryChangeSearch.emit(e.detail)}
                placeholder={i18n.web.form.search}
              />
            </div>
          </header>

          <div class={{ group: true }}>
            {this.satellites.map(satellite => {
              const {
                eclipsed,
                timestamp,
                latitude: satlatitude,
                longitude: satlongitude,
                azimuth,
              } = satellite.positions[0];

              return (
                <kry-card-satellite
                  favorite={this.favorites.includes(satellite.id)}
                  satname={satellite.name}
                  timestamp={new Date(timestamp).toLocaleString()}
                  eclipsed={eclipsed}
                  language={this.language}
                  satlongitude={satlongitude}
                  satlatitude={satlatitude}
                  azimuth={azimuth}
                  onKryTrackSatellite={() => this.kryTrackSatellite.emit(satellite.id)}
                  onKryFavoriteSatellite={e =>
                    this.kryFavoriteSatellite.emit({
                      id: satellite.id,
                      favorite: e.detail,
                    })
                  }
                  onMouseEnter={() =>
                    this.map && this.map.onFly([satlatitude, satlongitude])
                  }
                />
              );
            })}
          </div>
        </div>

        {isLoading && <slot name="loading" />}
      </Host>
    );
  }
}
