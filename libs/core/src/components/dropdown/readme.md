# kry-dropdown

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description | Type      | Default     |
| ---------- | ---------- | ----------- | --------- | ----------- |
| `dropdown` | `dropdown` |             | `string`  | `undefined` |
| `open`     | `open`     |             | `boolean` | `undefined` |

## Events

| Event      | Description | Type                   |
| ---------- | ----------- | ---------------------- |
| `kryClose` |             | `CustomEvent<boolean>` |

## Dependencies

### Used by

- [kry-card-news](../card-news)
- [kry-editor](../editor)
- [kry-logout](../../composites/logout)

### Graph

```mermaid
graph TD;
  kry-card-news --> kry-dropdown
  kry-editor --> kry-dropdown
  kry-logout --> kry-dropdown
  style kry-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
