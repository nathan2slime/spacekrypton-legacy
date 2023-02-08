import { Component, Host, h, Prop, EventEmitter, Event, Element } from '@stencil/core';

@Component({
  tag: 'kry-thumb-news',
  styleUrl: 'thumb-news.styles.scss',
  shadow: true,
})
export class KryThumbNews {
  @Prop() image: string;
  @Prop() name: string;
  @Prop() description: string;

  @Event({ composed: false }) kryRedirect: EventEmitter<boolean>;

  @Element() host: HTMLKryThumbNewsElement;

  render() {
    const styles = {
      backgroundImage: `url(${this.image})`,
    };

    return (
      <Host>
        <div style={styles} class={{ wrapper: true }}>
          <div>
            <h4 onClick={() => this.kryRedirect.emit()}>{this.name}</h4>

            <p>{this.description}</p>
          </div>
        </div>
      </Host>
    );
  }
}
