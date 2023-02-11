import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
  Watch,
  Fragment,
} from '@stencil/core';
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
  @Prop() open: boolean;
  @Prop() language: AppI18nLang;
  @Prop() currentItem: number;
  @Prop() items: MenuItem[] = [];

  @State() dropdown: boolean;
  @State() dropdownLogout: boolean;
  @State() dialogLogout: boolean;

  @Event({ composed: false }) kryCloseDrawer: EventEmitter<boolean>;
  @Event({ composed: false }) kryRedirect: EventEmitter<string>;
  @Event({ composed: false }) kryLogoutApp: EventEmitter<boolean>;

  elDialog: HTMLKryDialogElement;

  @Watch('dialogLogout')
  listenDialog() {
    if (!this.elDialog) {
      this.elDialog = document.createElement('kry-dialog-logout');
      document.body.appendChild(this.elDialog);

      this.elDialog.addEventListener('kryClose', () => (this.dialogLogout = false));
      this.elDialog.addEventListener('kryConfirm', () => this.kryLogoutApp.emit(true));
    }

    this.kryCloseDrawer.emit(true);
    this.dropdown = this.dropdownLogout = false;
    this.elDialog.open = this.dialogLogout;
  }

  render() {
    const styles = {
      backgroundImage: `url(${this.background})`,
    };
    const avatarStyles = {
      backgroundImage: `url(${this.user.avatar})`,
    };

    const i18n = langs[this.language].web.sidebar;

    return (
      <Host>
        <div class={{ wrapper: true, open: this.open }} style={this.background && styles}>
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
                open={this.open}
                onClick={() => this.kryRedirect.emit(item.route)}
                active={index == this.currentItem}
              />
            ))}
          </div>

          {!this.open && (
            <div class={{ logged: this.logged, menu: true }}>
              {this.logged ? (
                <div>
                  <div
                    style={avatarStyles}
                    kry-dropdown="logout-collapsed"
                    onClick={() => (this.dropdown = !this.dropdown)}
                  />
                </div>
              ) : (
                <kry-sidebar-item
                  kry-dropdown="logout-collapsed"
                  onClick={() => (this.dropdown = !this.dropdown)}
                  open={this.open}
                  icon="ri-menu-4-"
                  active
                />
              )}
            </div>
          )}

          <kry-dropdown
            dropdown="logout-collapsed"
            open={this.dropdown}
            top={10}
            class={{ logged: this.logged }}
            onKryClose={() => (this.dropdown = false)}
          >
            {this.logged ? (
              <Fragment>
                <kry-dropdown-item
                  hover
                  name={i18n.profile}
                  onClick={() => this.kryRedirect.emit('/auth/login')}
                  icon="ri-user-3-"
                />

                <kry-dropdown-item
                  hover={false}
                  name={i18n.logout}
                  icon="ri-logout-circle-"
                  kry-dialog
                  onClick={() => (this.dialogLogout = true)}
                />
              </Fragment>
            ) : (
              <Fragment>
                <kry-dropdown-item
                  name={i18n.login}
                  onClick={() => this.kryRedirect.emit('/auth/login')}
                  icon="ri-user-3-"
                />

                <kry-dropdown-item
                  name={i18n.signup}
                  onClick={() => this.kryRedirect.emit('/auth/signup')}
                  icon="ri-user-3-"
                />
              </Fragment>
            )}
          </kry-dropdown>

          {this.logged ? (
            <kry-logout
              {...this.user}
              language={this.language}
              onKryRedirect={e => this.kryRedirect.emit(e.detail)}
              onKryToggleDropdown={e => (this.dropdownLogout = e.detail)}
              onKryDialogLogout={() => (this.dialogLogout = true)}
              open={this.dropdownLogout}
            />
          ) : (
            <div>
              <kry-button
                size="small"
                onClick={() => this.kryRedirect.emit('/auth/login')}
                color="primary"
              >
                <span>{i18n.login}</span>
              </kry-button>

              <kry-button
                size="small"
                light="up"
                onClick={() => this.kryRedirect.emit('/auth/signup')}
                color="secondary"
              >
                <span>{i18n.signup}</span>
              </kry-button>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
