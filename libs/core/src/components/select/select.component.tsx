import {
  Component,
  Host,
  h,
  Prop,
  Element,
  Listen,
  Event,
  EventEmitter,
} from '@stencil/core';

import { SelectValue } from './select.model';

@Component({
  tag: 'kry-select',
  styleUrl: 'select.styles.scss',
  shadow: true,
})
export class KrySelect {
  @Prop({ mutable: true }) open: boolean;
  @Prop() placeholder: string = '';
  @Prop() value: SelectValue;
  @Prop() label: string;
  @Prop() options: SelectValue[] = [];

  @Element() host: HTMLKrySelectElement;

  @Event({ composed: false }) kryChange: EventEmitter<string>;

  title: HTMLDivElement;
  option: HTMLDivElement;
  slot: Element;

  @Listen('click', { target: 'window' })
  listenClick(e: any) {
    (this.host.parentNode as HTMLElement).style.position = 'relative';

    const els: Element[] = e.path || (e.composedPath && e.composedPath());

    if (els.includes(this.host)) {
      this.option.style.width = `${this.title.scrollWidth}px`;

      return;
    }

    this.open = false;
  }

  onOptionClick = (key: string) => {
    this.kryChange.emit(key);
    this.open = false;
  };

  toggleOpen = () => (this.open = !this.open);

  render() {
    return (
      <Host>
        {this.label && <label>{this.label}</label>}

        <div class={{ wrapper: true, open: this.open }}>
          <div ref={el => (this.title = el)} onClick={() => this.toggleOpen()}>
            <div>
              {this.value?.icon && <kry-icon name={this.value?.icon} />}

              <span>{this.value?.title || this.placeholder}</span>
            </div>

            <kry-icon name="ri-arrow-down-s-line" />
          </div>

          <div ref={el => (this.option = el)}>
            {this.options.map(option => (
              <div onClick={() => this.onOptionClick(option.key)}>
                {option.icon && <kry-icon name={option.icon} />}
                {option.title}
              </div>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
