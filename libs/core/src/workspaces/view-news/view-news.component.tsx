import { Event, EventEmitter, Component, Host, h, Prop } from '@stencil/core';

import { News } from '../news/news.model';

@Component({
  tag: 'kry-view-news',
  styleUrl: 'view-news.styles.scss',
  shadow: true,
})
export class KryViewNews {
  @Prop() news: News;

  @Event({ composed: false }) kryFallback: EventEmitter<boolean>;

  render() {
    const styles = {
      backgroundImage: `url(${this.news.cover})`,
    };

    return (
      <Host>
        <div class="wrapper">
          <header>
            <div>
              <kry-icon
                onClick={() => this.kryFallback.emit(true)}
                name="ri-arrow-left-s-line"
              />
              News
            </div>
          </header>

          <div class="thumb" style={styles} />

          <h1>{this.news.title}</h1>

          <div class="description">
            <p>{this.news.description}</p>
          </div>

          <section innerHTML={this.news.content} />

          <a target="_blank" href={this.news.origin}>
            I want the font
          </a>
        </div>
      </Host>
    );
  }
}
