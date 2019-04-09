import { configure } from '@storybook/react';
import { addParameters } from '@storybook/react';

addParameters({ viewport: {defaultViewport: 'iphone6'} });


const req = require.context(
    '../src/components',
    true,
    /\.story\.(js|jsx)$/,
)

function loadStories() {
    req.keys().forEach(filename => {
        req(filename)
    })
}


configure(loadStories, module);