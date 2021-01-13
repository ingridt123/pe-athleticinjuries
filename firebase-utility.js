"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.updateDocId = exports.generateDocId = exports.moveDoc = exports.deleteDoc = exports.copyDoc = void 0;
var firebaseAdmin = require('firebase-admin');
var serviceAccount = './credentials.json';
var firebaseUrl = 'https://pe-athleticinjuries.firebaseio.com';
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(require(serviceAccount)),
    databaseURL: firebaseUrl
});
var firestore = firebaseAdmin.firestore();
var copyDoc = function (collectionFrom, docIdFrom, collectionTo, docIdTo, addData, recursive) {
    if (addData === void 0) { addData = {}; }
    if (recursive === void 0) { recursive = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var docRef, docData, subcollections, subcollections_1, subcollections_1_1, subcollectionRef, subcollectionPath, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    docRef = firestore.collection(collectionFrom).doc(docIdFrom);
                    return [4 /*yield*/, docRef
                            .get()
                            .then(function (doc) { return doc.exists && doc.data(); })["catch"](function (error) {
                            console.error('Error reading document', collectionFrom + "/" + docIdFrom, JSON.stringify(error));
                            // throw new functions.https.HttpsError('not-found', 'Copying document was not read');
                        })];
                case 1:
                    docData = _b.sent();
                    if (!docData) return [3 /*break*/, 17];
                    // document exists, create the new item
                    return [4 /*yield*/, firestore
                            .collection(collectionTo)
                            .doc(docIdTo)
                            .set(__assign(__assign({}, docData), addData))["catch"](function (error) {
                            console.error('Error creating document', collectionTo + "/" + docIdTo, JSON.stringify(error));
                            //   throw new functions.https.HttpsError(
                            //     'data-loss',
                            //     'Data was not copied properly to the target collection, please try again.',
                            //   );
                        })];
                case 2:
                    // document exists, create the new item
                    _b.sent();
                    if (!recursive) return [3 /*break*/, 16];
                    return [4 /*yield*/, docRef.getCollections()];
                case 3:
                    subcollections = _b.sent();
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 10, 11, 16]);
                    subcollections_1 = __asyncValues(subcollections);
                    _b.label = 5;
                case 5: return [4 /*yield*/, subcollections_1.next()];
                case 6:
                    if (!(subcollections_1_1 = _b.sent(), !subcollections_1_1.done)) return [3 /*break*/, 9];
                    subcollectionRef = subcollections_1_1.value;
                    subcollectionPath = collectionFrom + "/" + docIdFrom + "/" + subcollectionRef.id;
                    return [4 /*yield*/, subcollectionRef
                            .get()
                            .then(function (snapshot) { return __awaiter(void 0, void 0, void 0, function () {
                            var docs, docs_1, docs_1_1, doc, e_2_1;
                            var e_2, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        docs = snapshot.docs;
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 7, 8, 13]);
                                        docs_1 = __asyncValues(docs);
                                        _b.label = 2;
                                    case 2: return [4 /*yield*/, docs_1.next()];
                                    case 3:
                                        if (!(docs_1_1 = _b.sent(), !docs_1_1.done)) return [3 /*break*/, 6];
                                        doc = docs_1_1.value;
                                        return [4 /*yield*/, exports.copyDoc(subcollectionPath, doc.id, collectionTo + "/" + docIdTo + "/" + subcollectionRef.id, doc.id, true)];
                                    case 4:
                                        _b.sent();
                                        _b.label = 5;
                                    case 5: return [3 /*break*/, 2];
                                    case 6: return [3 /*break*/, 13];
                                    case 7:
                                        e_2_1 = _b.sent();
                                        e_2 = { error: e_2_1 };
                                        return [3 /*break*/, 13];
                                    case 8:
                                        _b.trys.push([8, , 11, 12]);
                                        if (!(docs_1_1 && !docs_1_1.done && (_a = docs_1["return"]))) return [3 /*break*/, 10];
                                        return [4 /*yield*/, _a.call(docs_1)];
                                    case 9:
                                        _b.sent();
                                        _b.label = 10;
                                    case 10: return [3 /*break*/, 12];
                                    case 11:
                                        if (e_2) throw e_2.error;
                                        return [7 /*endfinally*/];
                                    case 12: return [7 /*endfinally*/];
                                    case 13: return [2 /*return*/, true];
                                }
                            });
                        }); })["catch"](function (error) {
                            console.error('Error reading subcollection', subcollectionPath, JSON.stringify(error));
                            //   throw new functions.https.HttpsError(
                            //     'data-loss',
                            //     'Data was not copied properly to the target collection, please try again.',
                            //   );
                        })];
                case 7: 
                // get all the documents in the collection
                return [2 /*return*/, _b.sent()];
                case 8: return [3 /*break*/, 5];
                case 9: return [3 /*break*/, 16];
                case 10:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 16];
                case 11:
                    _b.trys.push([11, , 14, 15]);
                    if (!(subcollections_1_1 && !subcollections_1_1.done && (_a = subcollections_1["return"]))) return [3 /*break*/, 13];
                    return [4 /*yield*/, _a.call(subcollections_1)];
                case 12:
                    _b.sent();
                    _b.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 15: return [7 /*endfinally*/];
                case 16: return [2 /*return*/, true];
                case 17: return [2 /*return*/, false];
            }
        });
    });
};
exports.copyDoc = copyDoc;
var deleteDoc = function (docPath) { return __awaiter(void 0, void 0, void 0, function () {
    var docRef, subcollections, subcollections_2, subcollections_2_1, subcollectionRef, e_3_1;
    var e_3, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                docRef = firestore.doc(docPath);
                return [4 /*yield*/, docRef.getCollections()];
            case 1:
                subcollections = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 8, 9, 14]);
                subcollections_2 = __asyncValues(subcollections);
                _b.label = 3;
            case 3: return [4 /*yield*/, subcollections_2.next()];
            case 4:
                if (!(subcollections_2_1 = _b.sent(), !subcollections_2_1.done)) return [3 /*break*/, 7];
                subcollectionRef = subcollections_2_1.value;
                return [4 /*yield*/, subcollectionRef
                        .get()
                        .then(function (snapshot) { return __awaiter(void 0, void 0, void 0, function () {
                        var docs, docs_2, docs_2_1, doc, e_4_1;
                        var e_4, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    docs = snapshot.docs;
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 7, 8, 13]);
                                    docs_2 = __asyncValues(docs);
                                    _b.label = 2;
                                case 2: return [4 /*yield*/, docs_2.next()];
                                case 3:
                                    if (!(docs_2_1 = _b.sent(), !docs_2_1.done)) return [3 /*break*/, 6];
                                    doc = docs_2_1.value;
                                    return [4 /*yield*/, exports.deleteDoc(docPath + "/" + subcollectionRef.id + "/" + doc.id)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [3 /*break*/, 2];
                                case 6: return [3 /*break*/, 13];
                                case 7:
                                    e_4_1 = _b.sent();
                                    e_4 = { error: e_4_1 };
                                    return [3 /*break*/, 13];
                                case 8:
                                    _b.trys.push([8, , 11, 12]);
                                    if (!(docs_2_1 && !docs_2_1.done && (_a = docs_2["return"]))) return [3 /*break*/, 10];
                                    return [4 /*yield*/, _a.call(docs_2)];
                                case 9:
                                    _b.sent();
                                    _b.label = 10;
                                case 10: return [3 /*break*/, 12];
                                case 11:
                                    if (e_4) throw e_4.error;
                                    return [7 /*endfinally*/];
                                case 12: return [7 /*endfinally*/];
                                case 13: return [2 /*return*/, true];
                            }
                        });
                    }); })["catch"](function (error) {
                        console.error('Error reading subcollection', docPath + "/" + subcollectionRef.id, JSON.stringify(error));
                        return false;
                    })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [3 /*break*/, 3];
            case 7: return [3 /*break*/, 14];
            case 8:
                e_3_1 = _b.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 14];
            case 9:
                _b.trys.push([9, , 12, 13]);
                if (!(subcollections_2_1 && !subcollections_2_1.done && (_a = subcollections_2["return"]))) return [3 /*break*/, 11];
                return [4 /*yield*/, _a.call(subcollections_2)];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                if (e_3) throw e_3.error;
                return [7 /*endfinally*/];
            case 13: return [7 /*endfinally*/];
            case 14: 
            // when all subcollections are deleted, delete the document itself
            return [2 /*return*/, docRef["delete"]()
                    .then(function () { return true; })["catch"](function (error) {
                    console.error('Error deleting document', docPath, JSON.stringify(error));
                    return false;
                })];
        }
    });
}); };
exports.deleteDoc = deleteDoc;
var moveDoc = function (collectionFrom, docIdFrom, collectionTo, docIdTo, addData) { return __awaiter(void 0, void 0, void 0, function () {
    var copied;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.copyDoc(collectionFrom, docIdFrom, collectionTo, docIdTo, addData, true)];
            case 1:
                copied = _a.sent();
                if (!copied) return [3 /*break*/, 3];
                return [4 /*yield*/, exports.deleteDoc(collectionFrom + "/" + docIdFrom)];
            case 2:
                _a.sent();
                return [2 /*return*/, true];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.moveDoc = moveDoc;
var generateDocId = function (length, chars) {
    if (length === void 0) { length = 20; }
    if (chars === void 0) { chars = "#aA"; }
    var mask = '';
    if (chars.indexOf('a') > -1)
        mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1)
        mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1)
        mask += '0123456789';
    if (chars.indexOf('!') > -1)
        mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i)
        result += mask[Math.floor(Math.random() * mask.length)];
    return result;
};
exports.generateDocId = generateDocId;
var updateDocId = function (collectionId) {
    if (collectionId === void 0) { collectionId = "body-parts"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var colRef, _a, _b, doc, subcollections, subcollections_3, subcollections_3_1, subcollectionRef, subdocs, _c, _d, sd, id, e_5_1, e_6_1, e_7_1;
        var e_7, _e, e_6, _f, e_5, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, firestore.collection(collectionId).get()];
                case 1:
                    colRef = _h.sent();
                    _h.label = 2;
                case 2:
                    _h.trys.push([2, 31, 32, 37]);
                    _a = __asyncValues(colRef.docs);
                    _h.label = 3;
                case 3: return [4 /*yield*/, _a.next()];
                case 4:
                    if (!(_b = _h.sent(), !_b.done)) return [3 /*break*/, 30];
                    doc = _b.value;
                    console.log(doc.id);
                    return [4 /*yield*/, firestore.doc(collectionId + "/" + doc.id).getCollections()];
                case 5:
                    subcollections = _h.sent();
                    _h.label = 6;
                case 6:
                    _h.trys.push([6, 23, 24, 29]);
                    subcollections_3 = (e_6 = void 0, __asyncValues(subcollections));
                    _h.label = 7;
                case 7: return [4 /*yield*/, subcollections_3.next()];
                case 8:
                    if (!(subcollections_3_1 = _h.sent(), !subcollections_3_1.done)) return [3 /*break*/, 22];
                    subcollectionRef = subcollections_3_1.value;
                    return [4 /*yield*/, subcollectionRef.get()];
                case 9:
                    subdocs = _h.sent();
                    _h.label = 10;
                case 10:
                    _h.trys.push([10, 15, 16, 21]);
                    _c = (e_5 = void 0, __asyncValues(subdocs.docs));
                    _h.label = 11;
                case 11: return [4 /*yield*/, _c.next()];
                case 12:
                    if (!(_d = _h.sent(), !_d.done)) return [3 /*break*/, 14];
                    sd = _d.value;
                    console.log(subcollectionRef.path);
                    console.log(sd.id);
                    if (sd.id.length <= 3) {
                        id = exports.generateDocId(20 - (sd.id.length + 1));
                        exports.moveDoc(subcollectionRef.path, sd.id, subcollectionRef.path, sd.id + "_" + id);
                    }
                    _h.label = 13;
                case 13: return [3 /*break*/, 11];
                case 14: return [3 /*break*/, 21];
                case 15:
                    e_5_1 = _h.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 21];
                case 16:
                    _h.trys.push([16, , 19, 20]);
                    if (!(_d && !_d.done && (_g = _c["return"]))) return [3 /*break*/, 18];
                    return [4 /*yield*/, _g.call(_c)];
                case 17:
                    _h.sent();
                    _h.label = 18;
                case 18: return [3 /*break*/, 20];
                case 19:
                    if (e_5) throw e_5.error;
                    return [7 /*endfinally*/];
                case 20: return [7 /*endfinally*/];
                case 21: return [3 /*break*/, 7];
                case 22: return [3 /*break*/, 29];
                case 23:
                    e_6_1 = _h.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 29];
                case 24:
                    _h.trys.push([24, , 27, 28]);
                    if (!(subcollections_3_1 && !subcollections_3_1.done && (_f = subcollections_3["return"]))) return [3 /*break*/, 26];
                    return [4 /*yield*/, _f.call(subcollections_3)];
                case 25:
                    _h.sent();
                    _h.label = 26;
                case 26: return [3 /*break*/, 28];
                case 27:
                    if (e_6) throw e_6.error;
                    return [7 /*endfinally*/];
                case 28: return [7 /*endfinally*/];
                case 29: return [3 /*break*/, 3];
                case 30: return [3 /*break*/, 37];
                case 31:
                    e_7_1 = _h.sent();
                    e_7 = { error: e_7_1 };
                    return [3 /*break*/, 37];
                case 32:
                    _h.trys.push([32, , 35, 36]);
                    if (!(_b && !_b.done && (_e = _a["return"]))) return [3 /*break*/, 34];
                    return [4 /*yield*/, _e.call(_a)];
                case 33:
                    _h.sent();
                    _h.label = 34;
                case 34: return [3 /*break*/, 36];
                case 35:
                    if (e_7) throw e_7.error;
                    return [7 /*endfinally*/];
                case 36: return [7 /*endfinally*/];
                case 37: return [2 /*return*/];
            }
        });
    });
};
exports.updateDocId = updateDocId;
exports.updateDocId();
exports.moveDoc("body-parts/test921923/stretching", "t2", "body-parts/test921923/stretching", "t5");
