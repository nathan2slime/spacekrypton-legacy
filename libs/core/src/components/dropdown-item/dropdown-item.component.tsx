import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'kry-dropdown-item',
  styleUrl: 'dropdown-item.styles.scss',
  shadow: true,
})
export class KryDropdownItem {
  @Prop() name: string;
  @Prop() route: string;
  @Prop() active: boolean;
  @Prop() icon: string;
  @Prop() hover: boolean = true;

  render() {
    return (
      <Host>
        <div class={{ wrapper: true, hover: this.hover, active: this.active }}>
          {this.name}

          {this.active ? (
            <kry-icon name={this.icon + 'fill'} />
          ) : (
            <kry-icon name={this.icon + 'line'} />
          )}
        </div>
      </Host>
    );
  }
}
