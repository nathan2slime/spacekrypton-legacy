# kry-dialog-logout

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type      | Default     |
| -------- | --------- | ----------- | --------- | ----------- |
| `open`   | `open`    |             | `boolean` | `undefined` |

## Events

| Event                | Description | Type                   |
| -------------------- | ----------- | ---------------------- |
| `kryClose`           |             | `CustomEvent<boolean>` |
| `kryRedirect`        |             | `CustomEvent<string>`  |
| `kryRequestLocation` |             | `CustomEvent<boolean>` |

## Dependencies

### Used by

- [kry-satellites](../../workspaces/satellites)
- [kry-track](../../workspaces/track)

### Depends on

- [kry-dialog](../../components/dialog)
- [kry-icon](../../components/icon)
- [kry-button](../../components/button)

### Graph

```mermaid
graph TD;
  kry-dialog-location --> kry-dialog
  kry-dialog-location --> kry-icon
  kry-dialog-location --> kry-button
  kry-satellites --> kry-dialog-location
  kry-track --> kry-dialog-location
  style kry-dialog-location fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
