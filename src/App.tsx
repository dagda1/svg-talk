import './App.css';

export function App(): JSX.Element {
  return (
    <svg width="1000" height="1000">
      <rect
        x="20%"
        y="20%"
        width="1000"
        height="1000"
        rx="20"
        style={{ fill: '#ff0000', stroke: '#000000', strokeWidth: '2px' }}
      />

      <rect
        x="30%"
        y="30%"
        width="1000"
        height="1000"
        rx="40"
        style={{ fill: '#0000ff', stroke: '#000000', strokeWidth: '2px', fillOpacity: 0.7 }}
      />
    </svg>
  );
}
