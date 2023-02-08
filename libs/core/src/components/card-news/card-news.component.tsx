import { Component, Host, Prop, h, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'kry-card-news',
  styleUrl: 'card-news.styles.scss',
  shadow: true,
})
export class KryCardNews {
  @Prop() _id: string;
  @Prop() image: string;
  @Prop() description: string;
  @Prop() admin: boolean;
  @Prop() name: string;

  @State() open: boolean;

  @Event({ composed: false }) kryRedirect: EventEmitter<string>;
  @Event({ composed: false }) kryDelete: EventEmitter<boolean>;

  toggleOpen = (open?: boolean) => (this.open = open ?? !this.open);

  render() {
    const styles = {
      backgroundImage: `url(${this.image})`,
    };

    return (
      <Host onClick={() => !this.admin && this.kryRedirect.emit(`/news/${this._id}`)}>
        <div class={{ wrapper: true, admin: this.admin }}>
          <div style={styles}>
            <div kry-dropdown={this._id} onClick={() => this.toggleOpen()}>
              <kry-icon name="ri-more-2-fill" />
            </div>
          </div>

          {this.admin && (
            <kry-dropdown
              open={this.open}
              dropdown={this._id}
              onKryClose={() => this.toggleOpen(false)}
            >
              <kry-dropdown-item
                onClick={() => this.kryRedirect.emit(`/news/${this._id}`)}
                name="View"
                icon="ri-focus-3-"
              />
              <kry-dropdown-item
                name="Edit"
                onClick={() => this.kryRedirect.emit(`/admin/news/edit/${this._id}`)}
                icon="ri-edit-2-"
              />
              <kry-dropdown-item
                onClick={() => {
                  this.open = false;
                  this.kryDelete.emit(true);
                }}
                kry-dialog
                name="Delete"
                icon="ri-delete-bin-"
              />
            </kry-dropdown>
          )}

          <div>
            <div>
              <h4>{this.name}</h4>
            </div>

            <div />

            <p>{this.description}</p>
          </div>
        </div>
      </Host>
    );
  }
}
