import './App.css'
import {Canvas} from "@react-three/fiber";
import {Float, OrbitControls} from "@react-three/drei";
import TextToSpeech from "./components/TextToSpeech.jsx";
import { Environment, Lightformer, SoftShadows, Html} from '@react-three/drei'
import AudioRecorder from "./components/AudioRecorder"
import ModelVitaly from './components/ModelVitaly';
import { proxy, useSnapshot } from 'valtio'
import faceExpressionState from './utils/faceExpressionState';

function App() {
    const snap = useSnapshot(faceExpressionState)

    return (
        <div className="containerX">
                <Canvas gammaFactor={2.2} gammaOutput>
                    <Environment background={true} near={1} far={1000} resolution={256} files="autumn_forest_04_1k.hdr" >
                    </Environment>
                    <ambientLight intensity={0.3} />
      <directionalLight 
        position={[0, 10, 0]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
        shadow-camera-far={50} 
        shadow-camera-left={-10} 
        shadow-camera-right={10} 
        shadow-camera-top={10} 
        shadow-camera-bottom={-10} 
      />
      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />
      <SoftShadows />
      <Float>
        <Html scale={0.3} occlude="blending" position={[-2,2.5,-1]} transform>
            <div dangerouslySetInnerHTML={{ __html: snap.convo }} style={{width: "250px", minHeight:"80px", padding:"5px", background: "rgba(0,0,0,0.1)"}}>
            </div>
        </Html>
      </Float>

            <ModelVitaly />
            <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        </Canvas>
        <TextToSpeech />
        <AudioRecorder></AudioRecorder>
        </div>
    )
}

export default App
