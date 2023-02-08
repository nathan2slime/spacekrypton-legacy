import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'kry-sidebar-item',
  styleUrl: 'sidebar-item.styles.scss',
  shadow: true,
})
export class KrySidebarItem {
  @Prop() name: string;
  @Prop() route: string;
  @Prop() active: boolean;
  @Prop() icon: string;

  render() {
    return (
      <Host>
        <div class={{ wrapper: true, active: this.active }}>
          {this.active ? (
            <kry-icon name={this.icon + 'fill'} />
          ) : (
            <kry-icon name={this.icon + 'line'} />
          )}

          {this.name}
        </div>
      </Host>
    );
  }
}
