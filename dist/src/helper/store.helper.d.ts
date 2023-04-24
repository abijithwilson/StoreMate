import { DatabaseService } from 'src/database/database.service';
export declare class StoreHelperService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService<any>);
    checkStoreUnderAdmin(storeId: any, id: any): Promise<boolean>;
    checkSectionUnderStore(storeId: any, sectionId: any): Promise<boolean>;
    checkProductUnderStore(storeId: any, sectionId: any, productId: any): Promise<boolean>;
}
