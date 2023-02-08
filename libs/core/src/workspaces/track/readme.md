# kry-track

<!-- Auto Generated Below -->

## Properties

| Property    | Attribute  | Description | Type                                                            | Default     |
| ----------- | ---------- | ----------- | --------------------------------------------------------------- | ----------- |
| `alert`     | --         |             | `{ color: KryColor; open: boolean; title?: string; }`           | `undefined` |
| `favorite`  | `favorite` |             | `boolean`                                                       | `undefined` |
| `loading`   | `loading`  |             | `boolean`                                                       | `undefined` |
| `satellite` | --         |             | `{ id: number; name: string; positions: SatellitePosition[]; }` | `undefined` |

## Events

| Event                  | Description | Type                                          |
| ---------------------- | ----------- | --------------------------------------------- |
| `kryCloseAlert`        |             | `CustomEvent<boolean>`                        |
| `kryFallback`          |             | `CustomEvent<boolean>`                        |
| `kryFavoriteSatellite` |             | `CustomEvent<boolean>`                        |
| `kryLocation`          |             | `CustomEvent<GeolocationPosition \| boolean>` |
| `kryRequestTrack`      |             | `CustomEvent<boolean>`                        |
| `kryTrackSatellite`    |             | `CustomEvent<boolean>`                        |

## Dependencies

### Depends on

- [kry-dialog-location](../../composites/dialog-location)
- [kry-icon](../../components/icon)
- [kry-map](../../components/map)
- [kry-track-view](../../components/track-view)
- [kry-alert](../../components/alert)

### Graph

```mermaid
graph TD;
  kry-track --> kry-dialog-location
  kry-track --> kry-icon
  kry-track --> kry-map
  kry-track --> kry-track-view
  kry-track --> kry-alert
  kry-dialog-location --> kry-dialog
  kry-dialog-location --> kry-icon
  kry-dialog-location --> kry-button
  kry-map --> kry-icon
  style kry-track fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
