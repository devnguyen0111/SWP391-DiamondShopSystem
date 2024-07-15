function Image({src}) {
    const source = '/'+src + '.jpg'
    return ( 
        <img src={source} alt="" style={{objectFit: 'contain'}}/>
     );
}

export default Image;