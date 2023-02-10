import { AppI18nLang, langs } from '@kry/i18n';
import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'kry-track-view',
  styleUrl: 'track-view.styles.scss',
  shadow: true,
})
export class KryTrackView {
  @Prop() longitude: number;
  @Prop() latitude: number;
  @Prop() eclipsed: boolean;
  @Prop() language: AppI18nLang;
  @Prop() timestamp: string;
  @Prop() sataltitude: number;
  @Prop() azimuth: number;
  @Prop() elevation: number;
  @Prop() ra: number;
  @Prop() dec: number;

  render() {
    const i18n = langs[this.language].web;
    const satI18n = i18n.satellites;

    return (
      <Host>
        <div class="wrapper">
          <div>
            <span>{satI18n.longitude}</span>
            <span>{this.longitude}</span>
          </div>

          <div>
            <span>{satI18n.latitude}</span>
            <span>{this.latitude}</span>
          </div>

          <div>
            <span>{satI18n.timestamp}</span>
            <span>{this.timestamp}</span>
          </div>

          <div>
            <span>{satI18n.eclipsed}</span>
            <span>{this.eclipsed ? i18n.yes : i18n.no}</span>
          </div>

          <div>
            <span>{satI18n.declination}</span>
            <span>{this.dec}</span>
          </div>

          <div>
            <span>{satI18n.azimuth}</span>
            <span>{this.azimuth}</span>
          </div>

          <div>
            <span>{satI18n.rightAscension}</span>
            <span>{this.ra}</span>
          </div>

          <div>
            <span>{satI18n.elevation}</span>
            <span>{this.elevation}</span>
          </div>
        </div>
      </Host>
    );
  }
}
