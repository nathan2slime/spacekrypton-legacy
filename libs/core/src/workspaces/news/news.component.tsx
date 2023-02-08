import { Element } from '@stencil/core';
import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
  Watch,
} from '@stencil/core';

import { News } from './news.model';

@Component({
  tag: 'kry-news',
  styleUrl: 'news.styles.scss',
  shadow: true,
})
export class KryNews {
  @Prop({ mutable: false }) news: News[] = [];
  @Prop() admin: boolean;
  @Prop() search: string;
  @Prop() loading: boolean;
  @Prop() isSearch: boolean;

  @State() dialog: boolean;
  @State() thumb: News;
  @State() deletedNewsId: string;

  @Event({ composed: false }) kryRedirect: EventEmitter<string>;
  @Event({ composed: false }) kryDeleteNews: EventEmitter<string>;
  @Event({ composed: false }) kryChangeSearch: EventEmitter<string>;
  @Event({ composed: false }) krySearch: EventEmitter<boolean>;

  @Element() host: HTMLKryNewsElement;

  elDialog: HTMLKryDialogLogoutElement;

  @Watch('dialog')
  deleteNews() {
    if (!this.elDialog) {
      this.elDialog = document.createElement('kry-dialog-logout');
      this.host.parentNode.appendChild(this.elDialog);

      this.elDialog.addEventListener('kryClose', () => {
        this.dialog = false;
      });
      this.elDialog.name = 'Do you really want to delete this news?';
      this.elDialog.icon = 'ri-delete-bin-5-line';

      this.elDialog.addEventListener('kryConfirm', () =>
        this.kryDeleteNews.emit(this.deletedNewsId)
      );
    }

    this.elDialog.open = this.dialog;
  }

  componentDidLoad() {
    this.thumb = this.news[0];
  }

  render() {
    return (
      <Host>
        <div class={{ wrapper: true, searched: this.isSearch }}>
          <header>
            <div>
              {this.isSearch ? (
                <span>
                  <kry-icon
                    onClick={() => this.kryRedirect.emit('/news')}
                    name="ri-arrow-left-s-line"
                  />
                </span>
              ) : (
                <kry-icon name="ri-newspaper-line" />
              )}

              {this.isSearch
                ? `${this.news.length} results for "${this.search}"`
                : 'News'}
            </div>

            <div>
              {!this.isSearch && (
                <kry-search
                  value={this.search}
                  icon="ri-search-line"
                  onKrySearch={() => this.krySearch.emit(true)}
                  onKryChangeValue={e => this.kryChangeSearch.emit(e.detail)}
                  placeholder="Search"
                />
              )}

              {this.admin && (
                <kry-button
                  color="tertiary"
                  block
                  onClick={() => this.kryRedirect.emit('/admin/news/edit/new')}
                >
                  <span>Create</span>
                  <kry-icon name="ri-add-line" />
                </kry-button>
              )}
            </div>
          </header>

          {!this.isSearch && (
            <kry-thumb-news
              description={this.thumb?.description}
              name={this.thumb?.title}
              image={this.thumb?.cover}
              onClick={() => this.kryRedirect.emit(`/news/${this.thumb._id}`)}
            />
          )}

          <div class={{ group: true }}>
            {(this.admin ? this.news : this.news.slice(1)).map(
              ({ _id, title, description, cover }) => (
                <kry-card-news
                  _id={_id}
                  key={_id}
                  admin={this.admin}
                  name={title}
                  image={cover}
                  description={description}
                  onKryDelete={() => {
                    this.dialog = true;
                    this.deletedNewsId = _id;
                  }}
                  onKryRedirect={e => this.kryRedirect.emit(e.detail)}
                />
              )
            )}
          </div>
        </div>

        {this.loading && <slot />}
      </Host>
    );
  }
}
