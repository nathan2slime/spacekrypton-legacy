import { AppI18nLang, langs } from '@kry/i18n';
import { Element, Event, EventEmitter, Prop } from '@stencil/core';
import { Component, Host, h, Watch, State } from '@stencil/core';

import { KryMapPoint } from '../../components/map/map.model';
import { Satellite, SatellitePosition } from '../satellites/satellites.model';

@Component({
  tag: 'kry-track',
  styleUrl: 'track.styles.scss',
  shadow: true,
})
export class KryTrack {
  @Prop() satellite: Satellite;
  @Prop() language: AppI18nLang;
  @Prop() favorite: boolean;
  @Prop() loading: boolean;

  @State() location: GeolocationPosition;
  @State() lines: KryMapPoint[] = [];
  @State() points: KryMapPoint[] = [];
  @State() dialog: boolean;
  @State() position = 0;

  @Event({ composed: false }) kryFallback: EventEmitter<boolean>;
  @Event({ composed: false }) kryLocation: EventEmitter<false | GeolocationPosition>;
  @Event({ composed: false }) kryRequestTrack: EventEmitter<boolean>;
  @Event({ composed: false }) kryFavoriteSatellite: EventEmitter<boolean>;
  @Event({ composed: false }) kryTrackSatellite: EventEmitter<boolean>;

  @Element() host: HTMLKryTrackElement;

  watch: number;
  map: HTMLKryMapElement;
  controller: NodeJS.Timeout;
  elDialog: HTMLKryDialogLocationElement;

  @Watch('location')
  listenLocation() {
    if (this.watch) {
      navigator.geolocation.clearWatch(this.watch);
    }
  }

  getLatLang = (position: SatellitePosition) => {
    const { latitude: satlatitude, longitude: satlongitude } = position;

    return {
      latlng: [satlatitude, satlongitude] as any,
    };
  };

  @Watch('position')
  listenPosition() {
    if (this.position == 350) {
      this.kryRequestTrack.emit(true);
    }
  }

  @Watch('satellite')
  loadSatellite() {
    if (this.controller) clearInterval(this.controller);

    this.position = 0;
    const { positions } = this.satellite;
    const pointConfig = {
      icon: 'ri-space-ship-fill',
      label: this.satellite.name,
    };

    this.lines = positions.map(position => this.getLatLang(position));
    this.points = [
      {
        ...this.lines[0],
        ...pointConfig,
      },
    ];

    this.controller = setInterval(() => {
      const data = this.lines[this.position + 1];

      if (data) {
        this.points = [
          {
            ...data,
            ...pointConfig,
          },
        ];

        this.position += 1;
      } else {
        this.kryRequestTrack.emit(true);

        clearTimeout(this.controller);
      }
    }, 1000);

    if (this.map) {
      this.map.onFly(this.lines[0].latlng);
      this.map.resizeMap();
    }
  }

  componentDidLoad() {
    this.getLocation();
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
        () => (this.dialog = true)
      );
    } else {
      this.dialog = true;
    }
  };

  render() {
    const isLoading = this.dialog ? false : this.loading;
    const i18n = langs[this.language].web.satellites;

    const currentPosition = this.satellite?.positions[this.position];

    return (
      <Host>
        <div class={{ wrapper: true, loading: isLoading }}>
          <header>
            <div>
              <kry-icon
                onClick={() => this.kryFallback.emit(true)}
                name="ri-arrow-left-s-line"
              />

              {this.satellite?.name}
            </div>

            {this.favorite ? (
              <kry-icon
                title="Favorite"
                onClick={() => this.kryFavoriteSatellite.emit(false)}
                name="ri-heart-3-fill"
              />
            ) : (
              <kry-icon
                title="Favorite"
                onClick={() => this.kryFavoriteSatellite.emit(true)}
                name="ri-heart-3-line"
              />
            )}
          </header>

          {!!this.location && (
            <kry-map
              ref={el => (this.map = el)}
              latitude={this.location.coords.latitude}
              longitude={this.location.coords.longitude}
              lines={this.lines}
              points={this.points}
              trace
              markHome
              track
              labelHome={i18n.you}
            />
          )}

          <div>
            <kry-track-view
              {...currentPosition}
              language={this.language}
              timestamp={new Date(currentPosition?.timestamp).toLocaleString()}
            />
          </div>
        </div>

        {isLoading && <slot />}
      </Host>
    );
  }
}
