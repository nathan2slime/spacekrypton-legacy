import { Element, Event, EventEmitter, Prop } from '@stencil/core';
import { Component, Host, h, Watch, State } from '@stencil/core';

import { KryMapPoint } from '../../components/map/map.model';
import { Satellite, SatellitePosition } from '../satellites/satellites.model';
import { KryAlert } from '../../utils/types';

@Component({
  tag: 'kry-track',
  styleUrl: 'track.styles.scss',
  shadow: true,
})
export class KryTrack {
  @Prop() satellite: Satellite;
  @Prop() favorite: boolean;
  @Prop() loading: boolean;
  @Prop() alert: KryAlert;

  @State() location: GeolocationPosition;
  @State() lines: KryMapPoint[] = [];
  @State() points: KryMapPoint[] = [];
  @State() dialog: boolean;
  @State() loaded: boolean;
  @State() position = 0;

  @Event({ composed: false }) kryCloseAlert: EventEmitter<boolean>;
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
    if (this.position == 270) {
      this.kryRequestTrack.emit(true);
    }
  }

  @Watch('satellite')
  loadSatellite() {
    if (this.controller) clearInterval(this.controller);

    this.position = 0;
    this.loaded = true;
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
      this.points = [
        {
          ...this.lines[this.position + 1],
          ...pointConfig,
        },
      ];

      this.position += 1;
    }, 1000);

    if (this.map) {
      this.map.onFly(this.lines[0].latlng);
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
        () => {
          this.dialog = true;
        }
      );
    } else {
      this.dialog = true;
    }
  };

  render() {
    const isLoading = this.dialog ? false : !this.loading ? !this.location : this.loading;

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

          <kry-map
            ref={el => (this.map = el)}
            latitude={this.location?.coords.latitude}
            longitude={this.location?.coords.longitude}
            lines={this.lines}
            points={this.points}
            trace
            markHome
          />

          <div>
            <kry-track-view
              {...currentPosition}
              timestamp={new Date(currentPosition?.timestamp).toLocaleString()}
            />
          </div>
        </div>

        {isLoading && <slot />}

        <kry-alert
          {...this.alert}
          time={3000}
          onKryClose={() => this.kryCloseAlert.emit(true)}
        >
          {this.alert.title}
        </kry-alert>
      </Host>
    );
  }
}
