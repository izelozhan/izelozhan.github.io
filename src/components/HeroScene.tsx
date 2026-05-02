import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'

function FloatingShape() {
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh position={[3.5, 0.2, -1]}>
        <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
        <MeshDistortMaterial
          color="#e879f9"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          roughness={0.05}
          metalness={0.9}
          distort={0.25}
          speed={2.5}
        />
      </mesh>
    </Float>
  )
}

function ParticleNetwork() {
  const groupRef = useRef<THREE.Group>(null)

  const { pointPositions, linePositions, lineColors } = useMemo(() => {
    const count = 70
    const points: THREE.Vector3[] = []
    const pos = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 26
      const y = (Math.random() - 0.5) * 16
      const z = (Math.random() - 0.5) * 8 - 3
      points.push(new THREE.Vector3(x, y, z))
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
    }

    const linePos: number[] = []
    const lineCol: number[] = []

    const colorA = new THREE.Color('#f472b6')
    const colorB = new THREE.Color('#a78bfa')
    const colorC = new THREE.Color('#67e8f9')

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = points[i].distanceTo(points[j])
        if (dist < 5.5) {
          linePos.push(points[i].x, points[i].y, points[i].z)
          linePos.push(points[j].x, points[j].y, points[j].z)

          const t = dist / 5.5
          const c = t < 0.5
            ? colorA.clone().lerp(colorB, t * 2)
            : colorB.clone().lerp(colorC, (t - 0.5) * 2)

          lineCol.push(c.r, c.g, c.b, c.r, c.g, c.b)
        }
      }
    }

    return {
      pointPositions: pos,
      linePositions: new Float32Array(linePos),
      lineColors: new Float32Array(lineCol),
    }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.035
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.07
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.07} color="#f9a8d4" transparent opacity={0.85} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.35} />
      </lineSegments>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[8, 8, 8]} color="#e879f9" intensity={3} />
      <pointLight position={[-8, -6, -4]} color="#67e8f9" intensity={1.5} />
      <Stars radius={60} depth={60} count={2500} factor={2} fade speed={0.4} />
      <ParticleNetwork />
      <FloatingShape />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
