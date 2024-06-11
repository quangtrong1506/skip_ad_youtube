interface ISettings {
    skip_ads?: boolean;
    hide_banner?: boolean;
    hide_short_video?: boolean;
    auto_next_video?: boolean;
}
type TKey = keyof ISettings;
const handleChange = async (key: TKey, value: boolean) => {
    const settings: ISettings = (await getDataPopup('settings')) as ISettings;
    settings[key] = value;
    saveDataPopup('settings', settings);
};
const saveDataPopup = (key: string, value: unknown) => {
    chrome.storage.local.set({ [key]: value });
};
const getDataPopup = async (key: string) => {
    const result = await chrome.storage.local.get(key);
    return result[key];
};

window.onload = async () => {
    const settings: ISettings = (await getDataPopup('settings')) as ISettings;
    document.querySelectorAll('.content input').forEach((element) => {
        const InputTag: HTMLInputElement = element as HTMLInputElement;
        InputTag.checked = settings[InputTag.id as TKey] as boolean;
        element.addEventListener('input', (event) => {
            const InputTag: HTMLInputElement = event.target as HTMLInputElement;
            handleChange(InputTag?.id as TKey, InputTag?.checked);
        });
    });
};