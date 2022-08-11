import reactDevtoolsSettingsButton from '../../assets/react-devtools-settings-button.png';
import reactDevtoolsSettings from '../../assets/react-devtools-settings.png';


export const BeforeStarting = () => {

    return (<>
        <div>Before looking through the examples, please follow these steps to setup your browser with some valuable extensions.</div>
        <br />
        <div>
            1. Install <a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en" target="_blank">react-devtools</a> and <a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en">redux-devtools</a><br /><br />
            2. Open your Chrome devtools and select the "Components" tab. You need to be on a page that contains a react app for the tab to appear.<br /><br />
            3. Click on the "settings" cog.<br /><br /> <img src={reactDevtoolsSettingsButton} width="90%" /><br /><br />
            4. Check the "Highlight updates when components render" option.<br /><br /> <img src={reactDevtoolsSettings} width="90%" />
        </div>
    </>)
}