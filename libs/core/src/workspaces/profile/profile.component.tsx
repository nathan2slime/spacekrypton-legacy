import { Component, Host, h, Prop } from '@stencil/core';

import { UserType } from '../../composites/sidebar/sidebar.model';

@Component({
  tag: 'kry-profile',
  styleUrl: 'profile.styles.scss',
  shadow: true,
})
export class KryProfile {
  @Prop() user: UserType;
  @Prop() avatarDefault: string;
  @Prop() me: boolean;

  render() {
    const getProfileThumb = (value: string) => ({ backgroundImage: `url(${value})` });

    return (
      <Host>
        <div class="wrapper">
          <div
            class="thumb"
            style={getProfileThumb(
              this.user?.thumb || 'https://images.alphacoders.com/193/193.jpg'
            )}
          >
            <div
              class="avatar"
              style={getProfileThumb(this.user?.avatar || this.avatarDefault)}
            />
          </div>

          <div class="username">
            <p>{this.user.username}</p>
          </div>
        </div>
      </Host>
    );
  }
}
