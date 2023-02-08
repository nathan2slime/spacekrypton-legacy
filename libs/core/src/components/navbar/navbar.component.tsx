import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'kry-navbar',
  styleUrl: 'navbar.styles.scss',
  shadow: true,
})
export class KryNavbar {
  @Prop() logo: string;

  @Event() kryOpenDrawer: EventEmitter<boolean>;
  @Event({ composed: false }) kryRedirect: EventEmitter<string>;

  render() {
    return (
      <Host>
        <div class="wrapper">
          <img src={this.logo} onClick={() => this.kryRedirect.emit('/')} />

          <kry-icon
            kry-drawer
            name="ri-menu-4-line"
            onClick={() => this.kryOpenDrawer.emit(true)}
          />
        </div>
      </Host>
    );
  }
}
