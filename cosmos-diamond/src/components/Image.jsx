function Image({src}) {
    const source = src + '.jpg'
    return ( 
        <img src={source} alt="" />
     );
}

export default Image;