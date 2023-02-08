import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'kry-track-view',
  styleUrl: 'track-view.styles.scss',
  shadow: true,
})
export class KryTrackView {
  @Prop() satlongitude: number;
  @Prop() satlatitude: number;
  @Prop() eclipsed: boolean;
  @Prop() timestamp: string;
  @Prop() sataltitude: number;
  @Prop() azimuth: number;
  @Prop() elevation: number;
  @Prop() ra: number;
  @Prop() dec: number;

  render() {
    return (
      <Host>
        <div class="wrapper">
          <div>
            <span>Longitude</span>
            <span>{this.satlongitude}</span>
          </div>

          <div>
            <span>Latitude</span>
            <span>{this.satlatitude}</span>
          </div>

          <div>
            <span>Timestamp</span>
            <span>{this.timestamp}</span>
          </div>

          <div>
            <span>Eclipsed</span>
            <span>{this.eclipsed ? 'yes' : 'no'}</span>
          </div>

          <div>
            <span>Declination</span>
            <span>{this.dec}</span>
          </div>

          <div>
            <span>Azimuth</span>
            <span>{this.azimuth}</span>
          </div>

          <div>
            <span>Right ascension</span>
            <span>{this.ra}</span>
          </div>

          <div>
            <span>Elevation</span>
            <span>{this.elevation}</span>
          </div>
        </div>
      </Host>
    );
  }
}
