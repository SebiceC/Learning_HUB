import { getEntry } from '../catalog';
import { navigate, paths } from '../lib/router';
import { Link } from './Link';

interface MapNode {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  // External references are shown for context but have no course
  external?: boolean;
}

interface MapEdge {
  from: string;
  to: string;
  label: string;
  // Optional quadratic curve control point, for edges that would cross another node
  curve?: [number, number];
}

const NODE_W = 180;
const NODE_H = 64;

const nodes: MapNode[] = [
  { id: '27002', label: 'ISO/IEC 27002', sub: 'Catálogo de controles', x: 110, y: 80, external: true },
  { id: '27001', label: 'ISO/IEC 27001', sub: 'SGSI', x: 110, y: 300 },
  { id: '27017', label: 'ISO/IEC 27017', sub: 'Seguridad cloud', x: 410, y: 80 },
  { id: '27018', label: 'ISO/IEC 27018', sub: 'PII en nube pública', x: 410, y: 300 },
  { id: '29100', label: 'ISO/IEC 29100', sub: 'Marco de privacidad', x: 710, y: 80, external: true },
  { id: '27701', label: 'ISO/IEC 27701', sub: 'PIMS', x: 710, y: 300 },
  { id: '27559', label: 'ISO/IEC 27559', sub: 'Desidentificación', x: 1010, y: 190 },
  { id: 'nist800-188', label: 'NIST SP 800-188', sub: 'Datasets públicos', x: 1010, y: 380 },
];

const edges: MapEdge[] = [
  { from: '27001', to: '27002', label: 'Anexo A ↔ controles' },
  { from: '27017', to: '27002', label: 'amplía para cloud' },
  { from: '27018', to: '27002', label: 'amplía para PII' },
  { from: '27017', to: '27018', label: 'complementarias' },
  { from: '27018', to: '29100', label: 'principios' },
  { from: '27701', to: '29100', label: 'ref. normativa' },
  { from: '27701', to: '27018', label: 'Anexo E' },
  { from: '27701', to: '27001', label: 'integrables', curve: [410, 450] },
  { from: '27701', to: '27559', label: 'minimización' },
  { from: 'nist800-188', to: '27559', label: 'la cita' },
];

const byId = (id: string) => nodes.find(n => n.id === id)!;

// Point where the segment from the node centre towards (tx, ty) leaves the node rectangle
function borderPoint(node: MapNode, tx: number, ty: number): [number, number] {
  const dx = tx - node.x;
  const dy = ty - node.y;
  const scale = Math.min(Math.abs((NODE_W / 2) / (dx || 1e-9)), Math.abs((NODE_H / 2) / (dy || 1e-9)));
  return [node.x + dx * scale, node.y + dy * scale];
}

const open = (standardId: string) => navigate(paths.course(standardId));

export function EcosystemMap() {
  return (
    <section className="mb-16 md:mb-24">
      <div className="mb-8 md:mb-12 border-b border-[#3c3c3c] pb-4">
        <h2 className="text-[24px] md:text-[32px] font-bold text-white uppercase leading-[1.15]">Mapa del ecosistema</h2>
        <p className="text-[16px] font-light text-[#bbbbbb] mt-2">Cómo se relacionan las normas. Pulsa una norma para abrir su curso.</p>
      </div>

      {/* Desktop: diagram */}
      <div className="hidden md:block m-card p-6 border border-[#3c3c3c]">
        <svg viewBox="0 0 1120 470" className="w-full h-auto" role="group" aria-label="Diagrama de relaciones entre las normas">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#7e7e7e" />
            </marker>
          </defs>

          {edges.map(edge => {
            const a = byId(edge.from);
            const b = byId(edge.to);
            const [cx, cy] = edge.curve ?? [(a.x + b.x) / 2, (a.y + b.y) / 2];
            const [x1, y1] = borderPoint(a, cx, cy);
            const [x2, y2] = borderPoint(b, cx, cy);
            const path = edge.curve ? `M${x1},${y1} Q${cx},${cy} ${x2},${y2}` : `M${x1},${y1} L${x2},${y2}`;
            // Label sits on the curve's midpoint (for a quadratic: 0.25·P0 + 0.5·C + 0.25·P2)
            const lx = edge.curve ? 0.25 * x1 + 0.5 * cx + 0.25 * x2 : (x1 + x2) / 2;
            const ly = edge.curve ? 0.25 * y1 + 0.5 * cy + 0.25 * y2 : (y1 + y2) / 2;
            const labelWidth = edge.label.length * 7.2 + 16;
            return (
              <g key={`${edge.from}-${edge.to}`}>
                <path d={path} fill="none" stroke="#3c3c3c" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <rect x={lx - labelWidth / 2} y={ly - 11} width={labelWidth} height="22" fill="#1a1a1a" />
                <text x={lx} y={ly + 4} textAnchor="middle" fill="#7e7e7e" fontSize="12" fontFamily="Inter, sans-serif">{edge.label}</text>
              </g>
            );
          })}

          {nodes.map(node => {
            const available = !node.external && getEntry(node.id);
            return (
              <g
                key={node.id}
                onClick={available ? () => open(node.id) : undefined}
                className={available ? 'cursor-pointer group' : undefined}
                role={available ? 'button' : undefined}
                tabIndex={available ? 0 : undefined}
                aria-label={available ? `Abrir el curso ${node.label}` : undefined}
                onKeyDown={available ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(node.id); } } : undefined}
              >
                <rect
                  x={node.x - NODE_W / 2} y={node.y - NODE_H / 2} width={NODE_W} height={NODE_H}
                  fill={node.external ? '#0d0d0d' : '#000'}
                  stroke={node.external ? '#3c3c3c' : '#1c69d4'}
                  strokeWidth="1.5"
                  strokeDasharray={node.external ? '5 4' : undefined}
                  className={available ? 'transition-colors group-hover:fill-[#1c69d4]' : undefined}
                />
                <text x={node.x} y={node.y - 4} textAnchor="middle" fill={node.external ? '#7e7e7e' : '#fff'} fontSize="15" fontWeight="700" fontFamily="Inter, sans-serif">{node.label}</text>
                <text x={node.x} y={node.y + 16} textAnchor="middle" fill={node.external ? '#7e7e7e' : '#bbbbbb'} fontSize="12" fontFamily="Inter, sans-serif">{node.sub}</text>
              </g>
            );
          })}
        </svg>
        <div className="flex flex-wrap gap-6 mt-4 text-[12px] font-light text-[#7e7e7e]">
          <span className="flex items-center"><span className="inline-block w-4 h-3 border border-[#1c69d4] mr-2"></span>Curso disponible</span>
          <span className="flex items-center"><span className="inline-block w-4 h-3 border border-dashed border-[#3c3c3c] mr-2"></span>Norma de referencia (sin curso)</span>
        </div>
      </div>

      {/* Mobile: relationship list, the diagram would be unreadable at phone width */}
      <ul className="md:hidden space-y-3">
        {edges.map(edge => {
          const a = byId(edge.from);
          const b = byId(edge.to);
          return (
            <li key={`${edge.from}-${edge.to}`} className="m-card p-4 text-[14px]">
              <MobileNode node={a} />
              <span className="text-[#7e7e7e]"> → {edge.label} → </span>
              <MobileNode node={b} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function MobileNode({ node }: { node: MapNode }) {
  if (node.external) return <span className="text-[#7e7e7e]">{node.label}</span>;
  return <Link to={paths.course(node.id)} className="text-white font-bold underline underline-offset-4">{node.label}</Link>;
}
