import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'kry-profile',
  styleUrl: 'profile.styles.scss',
  shadow: true,
})
export class KryProfile {
  render() {
    return (
      <Host>
        <div class="wrapper"></div>
      </Host>
    );
  }
}
