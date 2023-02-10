import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'kry-toggle-earth',
  styleUrl: 'toggle-earth.styles.scss',
  shadow: true,
})
export class KryToggleEarth {
  @Prop() viewMapIcon: string;
  @Prop() view3dIcon: string;
  @Prop() view3dlabel: string;
  @Prop() viewMapLabel: string;
  @Prop() label: string;
  @Prop() background: string;

  @Event() kryToggleViewEarth: EventEmitter<'3D' | '2D'>;

  render() {
    const styles = {
      backgroundImage: `url(${this.background})`,
    };

    return (
      <Host>
        <div class="wrapper" style={styles}>
          <span>
            <h3>{this.label}</h3>
          </span>

          <div>
            <div onClick={() => this.kryToggleViewEarth.emit('3D')}>
              <img src={this.view3dIcon} />
              {this.view3dlabel}
            </div>

            <div onClick={() => this.kryToggleViewEarth.emit('2D')}>
              <img src={this.viewMapIcon} />
              {this.viewMapLabel}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
