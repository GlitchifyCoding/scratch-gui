import {defineMessages} from 'react-intl';
import sharedMessages from '../shared-messages';

let messages = defineMessages({
    meow: {
        defaultMessage: 'Meow',
        description: 'Name for the meow sound',
        id: 'gui.defaultProject.meow'
    },
    variable: {
        defaultMessage: 'my variable',
        description: 'Name for the default variable',
        id: 'gui.defaultProject.variable'
    }
});

messages = {...messages, ...sharedMessages};

// use the default message if a translation function is not passed
const defaultTranslator = msgObj => msgObj.defaultMessage;

/**
 * Generate a localized version of the default project
 * @param {function} translateFunction a function to use for translating the default names
 * @return {object} the project data json for the default project
 */
const projectData = translateFunction => {
    const translator = translateFunction || defaultTranslator;
    return ({
        targets: [
            {
                isStage: true,
                name: 'Stage',
                variables: {
                    '`jEk@4|i[#Fk?(8x)AV.-my variable': [
                        translator(messages.variable),
                        0
                    ]
                },
                lists: {},
                broadcasts: {},
                blocks: {},
                currentCostume: 0,
                costumes: [
                    {
                        assetId: 'd3344650f594bcecdf46aa4a9441badd',
                        name: "Underwater",
                        md5ext: 'd3344650f594bcecdf46aa4a9441badd.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 240,
                        rotationCenterY: 180
                    }
                ],
                sounds: [
                    {
                        assetId: '83a9787d4cb6f3b7632b4ddfebf74367',
                        name: translator(messages.pop),
                        dataFormat: 'wav',
                        format: '',
                        rate: 11025,
                        sampleCount: 258,
                        md5ext: '83a9787d4cb6f3b7632b4ddfebf74367.wav'
                    }
                ],
                volume: 100
            },
            {
                isStage: false,
                name: "Taco",
                variables: {},
                lists: {},
                broadcasts: {},
                blocks: {},
                currentCostume: 0,
                costumes: [
                    {
                        assetId: '383ea1ef802bc2706670536cfa8271b7',
                        name: "Taco",
                        bitmapResolution: 1,
                        md5ext: '383ea1ef802bc2706670536cfa8271b7.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 78,
                        rotationCenterY: 48
                    },
                ],
                sounds: [
                    {
                        assetId: '83c36d806dc92327b9e7049a565c6bff',
                        name: translator(messages.meow),
                        dataFormat: 'wav',
                        format: '',
                        rate: 22050,
                        sampleCount: 18688,
                        md5ext: '83c36d806dc92327b9e7049a565c6bff.wav'
                    }
                ],
                volume: 100,
                visible: true,
                x: 0,
                y: 0,
                size: 100,
                direction: 90,
                draggable: false,
                rotationStyle: 'all around'
            }
        ],
        meta: {
            semver: '3.0.0',
            vm: '0.1.0',
            agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36' // eslint-disable-line max-len
        }
    });
};


export default projectData;
