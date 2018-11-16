var g_Map: GameMap = new GameMap();

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
    Exit: function () { }
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