import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { KryField } from '../../utils/types';

@Component({
  tag: 'kry-login',
  styleUrl: 'login.styles.scss',
  shadow: true,
})
export class KryLogin {
  @Prop() type: 'login' | 'signup' = 'login';
  @Prop() background: string;
  @Prop() email: string;
  @Prop() password: string;
  @Prop() emailMessage: string;
  @Prop() passwordMessage: string;
  @Prop() usernameMessage: string;
  @Prop() username: string;
  @Prop() isInvalid: boolean;
  @Prop() labelUsername: string = 'Username';
  @Prop() labelEmail: string = 'Email';
  @Prop() labelPassword: string = 'Password';

  @Prop() icon: string;
  @Prop() isLoading: boolean;
  @Prop() footer: string;
  @Prop() action: string;
  @Prop() redirect: string;

  @Event() kryRedirect: EventEmitter<string>;
  @Event() kryChangeValue: EventEmitter<KryField>;
  @Event() kryAuth: EventEmitter<boolean>;

  render() {
    const styles = {
      backgroundImage: `url(${this.background})`,
    };

    return (
      <Host>
        <div class="wrapper" style={styles}>
          <main>
            <img onClick={() => this.kryRedirect.emit('/')} src={this.icon} />

            <div>
              {this.type == 'signup' && (
                <kry-input
                  label={this.labelUsername}
                  invalid={!!this.usernameMessage}
                  message={this.usernameMessage}
                  onKryChangeValue={e =>
                    this.kryChangeValue.emit({ value: e.detail, name: 'username' })
                  }
                />
              )}

              <kry-input
                label={this.labelEmail}
                invalid={!!this.emailMessage}
                message={this.emailMessage}
                onKryChangeValue={e =>
                  this.kryChangeValue.emit({ value: e.detail, name: 'email' })
                }
              />

              <kry-input
                label={this.labelPassword}
                type="password"
                invalid={!!this.passwordMessage}
                message={this.passwordMessage}
                onKryChangeValue={e =>
                  this.kryChangeValue.emit({ value: e.detail, name: 'password' })
                }
                onKeyDown={({ code }) => code == 'Enter' && this.kryAuth.emit(true)}
              />

              <footer>
                {this.footer}&nbsp;
                <a onClick={() => this.kryRedirect.emit()}>{this.redirect}</a>
              </footer>
            </div>

            <kry-button
              disable={this.isLoading || this.isInvalid}
              bold={600}
              onClick={() => this.kryAuth.emit(true)}
            >
              {this.isLoading ? <slot /> : this.action}
            </kry-button>
          </main>
        </div>
      </Host>
    );
  }
}
