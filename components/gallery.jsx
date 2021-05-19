
import React, { useState } from 'react';
//Material-UI dependencies
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ChangeHistoryTwoToneIcon from '@material-ui/icons/ChangeHistoryTwoTone';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';

const Gallery = (props) => {
  const photos = ['/nails0.png', '/nails1.png', '/nails2.png', '/nails3.png', '/nails4.png']
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const increment = function() {
    setCurrentPhoto(currentPhoto + 1)
  }

  const decrement = function() {
    setCurrentPhoto(currentPhoto - 1)
  }

  const setPhoto = function(index) {
    setCurrentPhoto(index)
  }

  return (
    <div style={{margin: '1rem'}}>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <IconButton
            style={currentPhoto === 0 ? { visibility: 'hidden', color: 'white' } : { color: 'white' }}
            onClick={() => decrement()}
          >
            <ArrowBackIcon/>
          </IconButton>
        </Grid>
        <Grid item container xs={10} justify="center">
          <img
            src={photos[currentPhoto]}
            style={{
              objectFit: "cover",
              width: "500px",
              height: "600px"
            }}/>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            style={currentPhoto === photos.length - 1 ?
              { visibility: 'hidden', color: 'white' } :
              { color: 'white' }}
            onClick={() => increment()}
          >
            <ArrowForwardIcon/>
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        alignContent="center"
        justify="center"
        >
        {photos.map((photo, index) => {
          if (currentPhoto === index) {
            return (
              <Grid item key={index}>
                <IconButton>
                  <ChangeHistoryTwoToneIcon style={{ color: 'white', filter: "invert(0.2) sepia(50) saturate(100) hue-rotate(290deg)" }}/>
                </IconButton>
              </Grid>
            );
          } else {
            return (
              <Grid item key={index}>
                <IconButton onClick={() => setCurrentPhoto(index)}>
                  <ChangeHistoryIcon style={{ color: 'white' }}/>
                </IconButton>
              </Grid>
            );
          }
        })}
      </Grid>
    </div>
  );
};

export default Gallery;
