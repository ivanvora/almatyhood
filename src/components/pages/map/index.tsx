import { Button, Modal } from 'antd';
import { LatLngExpression, Polygon } from 'leaflet'
import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer,WMSTileLayer } from 'react-leaflet';

type Props = {
    markers?:LatLngExpression[];
    layers?:string;
}

 const Map = ({markers,layers}: Props) => {
    const [isOpen,setIsOpen] = useState(false);
    const position:LatLngExpression = [43.25667, 76.92861]
  const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const props = {
  token: "public",
  version: "1.3",
  format: "image/svg",
  transparent: true,
  tiles: true,
  uppercase: true,
  layers:layers ,
  foo: [123, 5566]
};

  return (
    <div>
        <Modal open={isOpen} onCancel={()=>setIsOpen(false)}/>
            <MapContainer   attributionControl={false} style={{height:'100vh',width:'100vw'}} center={position} zoom={12} scrollWheelZoom={false}>
                <TileLayer
      url={url}/>
      <WMSTileLayer url='http://20.92.225.31:8080/geoserver/ne/wms?' {...props} />
       <Marker position={position}>
      <Popup >
        A pretty CSS3 popup. <br /> Easily customizable.
        <Button onClick={()=>setIsOpen(true)}>привет </Button>
      </Popup>
    </Marker>
    {markers?.map((item,index)=><Marker key={index} position={item} >{index}</Marker>)}
    
            </MapContainer>
    </div>
  )
}

export default Map