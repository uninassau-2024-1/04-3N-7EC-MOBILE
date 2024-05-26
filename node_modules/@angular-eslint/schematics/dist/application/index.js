"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devkit_1 = require("@nx/devkit");
const ngcli_adapter_1 = require("@nx/devkit/ngcli-adapter");
const utils_1 = require("../utils");
exports.default = (0, devkit_1.convertNxGenerator)(async (tree, options) => {
    // Remove angular-eslint specific options before passing to the Angular schematic
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { setParserOptionsProject, ...angularOptions } = options;
    const applicationGenerator = (0, ngcli_adapter_1.wrapAngularDevkitSchematic)('@schematics/angular', 'application');
    await applicationGenerator(tree, angularOptions);
    // Update the lint builder and config in angular.json
    (0, utils_1.addESLintTargetToProject__NX)(tree, options.name, 'lint');
    (0, utils_1.createESLintConfigForProject__NX)(tree, options.name, options.setParserOptionsProject ?? false);
});
