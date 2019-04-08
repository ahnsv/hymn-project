import { configure } from '@storybook/react';

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