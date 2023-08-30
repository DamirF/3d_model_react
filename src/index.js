import * as THREE from "three"
import { Suspense, useMemo } from "react"
import ReactDOM from "react-dom"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Stage, OrbitControls } from "@react-three/drei"
import "./styles.css"

function Model() {
  const { nodes } = useGLTF("/headless.glb")
  console.log(nodes, "===nodes")
  const edges = useMemo(() => new THREE.EdgesGeometry(nodes.Cube.geometry, 15), [nodes])
  return (
    <group dispose={null}>
      <mesh geometry={nodes.Cube.geometry}>
        <meshStandardMaterial transparent />
      </mesh>
      {/* <lineSegments geometry={edges} renderOrder={100}>
        <lineBasicMaterial color="black" />
      </lineSegments> */}
    </group>
  )
}

ReactDOM.render(
  <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3], fov: 50 }}>
    <Suspense fallback={null}>
      <Stage>
        <Model />
      </Stage>
    </Suspense>
    <OrbitControls makeDefault dampingFactor={0.3} />
  </Canvas>,
  document.getElementById("root")
)
