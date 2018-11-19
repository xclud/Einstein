var g_Map: GameMap = new GameMap();
const INVALID_ENTITY = -1;
const SYSTEM_ENTITY = 0;
const INVALID_PLAYER = -1;

const IID_PlayerManager = 10;
const IID_Position = 11;
const IID_Obstruction = 12;
const IID_Cost = 13;
const IID_UnitAI = 14;
const IID_RangeManager = 15;
const IID_ResourceSupply = 16;
const IID_GuiInterface = 17;
const IID_Formation = 18;
const IID_WaterManager = 19;
const IID_Terrain = 20;
const IID_Visual = 21;
const IID_Player = 22;
const IID_Ownership = 23;
const IID_Identity = 24;
const IID_GarrisonHolder = 25;
const IID_Foundation = 26;
const IID_EntityLimits = 27;
const IID_Gate = 28;
const IID_Capturable = 29;
const IID_Sound = 30;
const IID_Repairable = 31;
const IID_Guard = 31;
const IID_AlertRaiser = 32;
const IID_AIInterface = 33;
const IID_AIManager = 34;
const IID_AuraManager = 35;
const IID_Barter = 36;
const IID_Health = 37;
const IID_Mirage = 38;
const IID_EndGameManager = 39;
const IID_Trigger = 40;
const IID_Upgrade = 41;
const IID_Trader = 42;
const IID_Market = 43;
const IID_BuildRestrictions = 44;
const IID_TechnologyManager = 45;
const IID_TemplateManager = 46;
const IID_ResourceDropsite = 47;
const IID_RallyPoint = 48;
const IID_Promotion = 49;
const IID_ProductionQueue = 50;
const IID_ObstructionManager = 51;
const IID_CeasefireManager = 52;
const IID_VisionSharing = 53;
const IID_StatisticsTracker = 54;
const IID_Fogging = 55;
const IID_Timer = 56;
const IID_DeathDamage = 57;

const MT_InitGame = 100;
const MT_SkirmishReplace = 101;
const MT_EntityRenamed = 102;
const MT_AIMetadata = 103;
const MT_HealthChanged = 104;

var g_MapSettings = {
    Name: "XX",
    Size: 100,
    CircularMap: false,
    TriggerDifficulty: 3,
};

var Engine = {
    ExportMap: function (x) {

    },
    LoadMapTerrain: function (x): any {
        return undefined;
    },
    GetTerrainTileSize: function (): number {
        return 1;
    },
    GetTemplate: function (t: string): any {
        return null;
    },
    ReadJSONFile: function (x: string): any {
        return null;
    },
    LoadLibrary: function (x: string) {

    },
    ListDirectoryFiles(...x: any[]): string[] {
        return null;
    },
    PostCommand(...x: any[]): any {
        return null;
    },
    DumpImage(...x: any[]): any {
        return null;
    },
    ProfileStop: function () { },
    ProfileStart: function (x) { },
    Exit() { },

    RegisterGlobal(...x: any[]) { },
    QueryInterface<T=any>(x: number, y): T {
        return undefined;
    },
    GetEntitiesWithInterface(x: number): number[] {
        throw new Error();
    },
    DestroyEntity(x: number) { },
    AddEntity(x: any): number { throw new Error() },
    AddLocalEntity(x: any): number { throw new Error() },
    PostMessage(x: number, y: number, z: any) { },
    BroadcastMessage(...x: any[]) { },
    FlushDestroyedEntities() { },
    RegisterComponentType(x: number, y: string, z: any) { }
};

function getNumPlayers(): number {
    return 3;
}

function deepfreeze<T>(i: T): T {
    return i;
}

function uneval(x): string {
    return "";
}

function clone<T>(x: T): T {
    return x;
}

function markForTranslationWithContext(...x: any[]): any {
    throw new Error();
}
function markForTranslation(...x: any[]): any {
    throw new Error();
}