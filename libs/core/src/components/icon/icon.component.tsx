import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'kry-icon',
  styleUrl: 'icon.styles.scss',
  shadow: true,
})
export class KryIcon {
  @Prop() name: string;

  @Event({ composed: true }) kryClick: EventEmitter<boolean>;

  render() {
    return (
      <Host>
        <i class={this.name} onClick={() => this.kryClick.emit(true)} />
      </Host>
    );
  }
}
