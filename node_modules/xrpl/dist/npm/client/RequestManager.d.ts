import { Response } from '../models/methods';
import { BaseRequest, ErrorResponse } from '../models/methods/baseMethod';
export default class RequestManager {
    private nextId;
    private readonly promisesAwaitingResponse;
    resolve(id: string | number, response: Response): void;
    reject(id: string | number, error: Error): void;
    rejectAll(error: Error): void;
    createRequest<T extends BaseRequest>(request: T, timeout: number): [string | number, string, Promise<Response>];
    handleResponse(response: Partial<Response | ErrorResponse>): void;
    private deletePromise;
}
//# sourceMappingURL=RequestManager.d.ts.map