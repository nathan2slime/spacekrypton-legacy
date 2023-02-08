import {
  Component,
  Host,
  h,
  Event,
  EventEmitter,
  Prop,
  Watch,
  State,
} from '@stencil/core';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Text from '@tiptap/extension-text';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';
import ListItem from '@tiptap/extension-list-item';

@Component({
  tag: 'kry-editor',
  styleUrl: 'editor.styles.scss',
  shadow: true,
})
export class KryEditor {
  @Prop() message: string;
  @Prop() value: string;
  @Prop() invalid: boolean;

  @State() dropdownImage: boolean;
  @State() dropdownLink: boolean;
  @State() imageLink: string;
  @State() customLink: string;

  @Event() kryChange: EventEmitter<string>;

  editor: Editor;
  wrapper: HTMLDivElement;

  toolbar = [
    {
      action: () => this.editor.commands.toggleBold(),
      icon: 'ri-bold',
    },
    {
      action: () => this.editor.commands.toggleItalic(),
      icon: 'ri-italic',
    },
    {
      action: () => this.editor.commands.toggleUnderline(),
      icon: 'ri-underline',
    },
    {
      action: () => this.editor.commands.toggleStrike(),
      icon: 'ri-strikethrough',
    },
    {
      action: () => this.editor.commands.toggleBlockquote(),
      icon: 'ri-double-quotes-l',
    },
    {
      action: () => this.editor.commands.toggleHeading({ level: 1 }),
      icon: 'ri-h-1',
    },
    {
      action: () => this.editor.commands.toggleHeading({ level: 2 }),
      icon: 'ri-h-2',
    },
    {
      action: () => (this.dropdownImage = true),
      icon: 'ri-image-line',
    },
    {
      action: () => (this.dropdownLink = true),
      icon: 'ri-links-line',
    },
  ];

  @Watch('value')
  listenValue() {
    if (!this.value) {
      this.editor.commands.setContent('');
    }
  }

  componentDidLoad() {
    this.editor = new Editor({
      element: this.wrapper,
      extensions: [
        StarterKit,
        Document,
        Underline,
        Paragraph,
        ListItem,
        Image.configure({
          inline: true,
        }),
        Text,
        Link.configure({
          openOnClick: false,
          validate: url => url.trim() != '',
        }),
        Heading.configure({
          levels: [1, 2],
        }),
      ],
      content: this.value,
    });

    this.editor.on('transaction', () => {
      this.kryChange.emit(this.editor.getHTML());
    });
  }

  render() {
    return (
      <Host>
        <div class={{ wrapper: true, invalid: this.invalid }}>
          <div>
            {this.toolbar.map(tool => (
              <kry-icon
                kry-dropdown={tool.icon}
                name={tool.icon}
                onClick={() => tool.action()}
              />
            ))}
          </div>

          <div ref={el => (this.wrapper = el)} />

          {this.invalid && <span>{this.message}</span>}

          <kry-dropdown
            open={this.dropdownImage}
            onKryClose={() => {
              this.imageLink = '';
              this.dropdownImage = false;
            }}
            dropdown="ri-image-line"
          >
            <kry-input
              value={this.imageLink}
              onKryChangeValue={e => (this.imageLink = e.detail)}
            />

            <kry-button
              onClick={() => {
                this.editor.commands.setImage({ src: this.imageLink });
                this.dropdownImage = false;
              }}
            >
              <span>Add</span>
            </kry-button>
          </kry-dropdown>

          <kry-dropdown
            open={this.dropdownLink}
            onKryClose={() => {
              this.customLink = '';
              this.dropdownLink = false;
            }}
            dropdown="ri-links-line"
          >
            <kry-input
              value={this.customLink}
              onKryChangeValue={e => (this.imageLink = e.detail)}
            />

            <kry-button
              color="secondary"
              onClick={() => this.editor.commands.unsetLink()}
            >
              <kry-icon name="ri-link-unlink" />
            </kry-button>
            <kry-button
              onClick={() => {
                this.editor.commands.toggleLink({
                  href: this.customLink,
                  target: '_blank',
                });
                this.customLink = '';
                this.dropdownLink = false;
              }}
            >
              <span>Add</span>
            </kry-button>
          </kry-dropdown>
        </div>
      </Host>
    );
  }
}
