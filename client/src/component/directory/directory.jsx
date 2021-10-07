import React from 'react';
import { DirectoryMenuContainer } from './directory.styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item';
import  {selectDirectorySections} from '../../redux/directory/directorySelector';


const Directory =({sections})=> (
  
        <DirectoryMenuContainer>
        {sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </DirectoryMenuContainer>
)
    
const mapStateToProps =createStructuredSelector({
  sections:selectDirectorySections
})

export default connect(mapStateToProps)(Directory);