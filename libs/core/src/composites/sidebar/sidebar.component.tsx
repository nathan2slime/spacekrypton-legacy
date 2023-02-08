import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { AppI18nLang, langs } from '@kry/i18n';

import { MenuItem, UserType } from './sidebar.model';

@Component({
  tag: 'kry-sidebar',
  styleUrl: 'sidebar.styles.scss',
  shadow: true,
})
export class KrySidebar {
  @Prop() logo: string;
  @Prop() user: UserType;
  @Prop() background: string;
  @Prop() logged: boolean;
  @Prop() language: AppI18nLang;
  @Prop() currentItem: number;
  @Prop() items: MenuItem[] = [];

  @Event({ composed: false }) kryCloseDrawer: EventEmitter<boolean>;
  @Event({ composed: false }) kryRedirect: EventEmitter<string>;
  @Event({ composed: false }) kryLogoutApp: EventEmitter<boolean>;

  render() {
    const styles = {
      backgroundImage: `url(${this.background})`,
    };

    return (
      <Host>
        <div class="wrapper" style={this.background && styles}>
          <header>
            <img onClick={() => this.kryRedirect.emit('/')} src={this.logo} />

            <kry-icon
              name="ri-close-line"
              onClick={() => this.kryCloseDrawer.emit(true)}
            />
          </header>

          <div>
            {this.items.map((item, index) => (
              <kry-sidebar-item
                {...item}
                onClick={() => this.kryRedirect.emit(item.route)}
                active={index == this.currentItem}
              />
            ))}
          </div>

          {this.logged ? (
            <kry-logout
              {...this.user}
              language={this.language}
              onKryRedirect={e => this.kryRedirect.emit(e.detail)}
              onKryCloseDrawer={() => this.kryCloseDrawer.emit(true)}
              onKryLogoutApp={() => this.kryLogoutApp.emit(true)}
            />
          ) : (
            <div>
              <kry-button
                size="small"
                onClick={() => this.kryRedirect.emit('/auth/login')}
                color="primary"
              >
                <span>{langs[this.language].web.sidebar.login}</span>
              </kry-button>

              <kry-button
                size="small"
                light="up"
                onClick={() => this.kryRedirect.emit('/auth/signup')}
                color="secondary"
              >
                <span>{langs[this.language].web.sidebar.signup}</span>
              </kry-button>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
