import DataManager from "@Helpers/DataManager";

export default class MockManager implements DataManager{
    addRequest(request): Promise<boolean> {
        return Promise.resolve(false);
    }
}