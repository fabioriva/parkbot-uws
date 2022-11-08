// generate I/O
exports.inputs1 = [
  { addr: 'E0.0', label: 'A' },
  { addr: 'E0.1', label: 'B' },
  { addr: 'E0.2', label: 'C' },
  { addr: 'E0.3', label: 'D' },
  { addr: 'E0.4', label: 'OK' },
  { addr: 'E0.5', label: 'S2' },
  { addr: 'E0.6', label: 'S2' },
  { addr: 'E0.7', label: 'S2' },
  { addr: 'E1.0', label: 'SFT1' },
  { addr: 'E1.1', label: '' },
  { addr: 'E1.2', label: '' },
  { addr: 'E1.3', label: 'RS3' },
  { addr: 'E1.4', label: 'RS12' },
  { addr: 'E1.5', label: 'DB32' },
  { addr: 'E1.6', label: 'DBHZ' },
  { addr: 'E1.7', label: 'UC' },
  { addr: 'E2.0', label: 'BA' },
  { addr: 'E2.1', label: 'BB' },
  { addr: 'E2.2', label: 'BC' },
  { addr: 'E2.3', label: 'BD' },
  { addr: 'E2.4', label: 'STR' },
  { addr: 'E2.5', label: 'OK' },
  { addr: 'E2.6', label: 'DAT' },
  { addr: 'E2.7', label: 'SFT' },
  { addr: 'E3.0', label: 'BA' },
  { addr: 'E3.1', label: 'BB' },
  { addr: 'E3.2', label: 'BC' },
  { addr: 'E3.3', label: 'BD' },
  { addr: 'E3.4', label: 'STR' },
  { addr: 'E3.5', label: 'OK' },
  { addr: 'E3.6', label: 'DAT' },
  { addr: 'E3.7', label: '' },
  { addr: 'E4.0', label: 'IV1' },
  { addr: 'E4.1', label: 'IV2' },
  { addr: 'E4.2', label: '' },
  { addr: 'E4.3', label: 'FSQA' },
  { addr: 'E4.4', label: 'AIV1' },
  { addr: 'E4.5', label: 'AIV2' },
  { addr: 'E4.6', label: 'AF7' },
  { addr: 'E4.7', label: 'AKKP' },
  { addr: 'E5.0', label: 'FE12' },
  { addr: 'E5.1', label: 'FSBK' },
  { addr: 'E5.2', label: 'ASBK1' },
  { addr: 'E5.3', label: 'ASBK2' },
  { addr: 'E5.4', label: 'RTA' },
  { addr: 'E5.5', label: '' },
  { addr: 'E5.6', label: 'AD' },
  { addr: 'E5.7', label: '' },
  { addr: 'E6.0', label: 'EZE' },
  { addr: 'E6.1', label: 'EOE' },
  { addr: 'E6.2', label: 'FBE' },
  { addr: 'E6.3', label: 'FPE' },
  { addr: 'E6.4', label: 'FDR1' },
  { addr: 'E6.5', label: 'FDL1' },
  { addr: 'E6.6', label: 'FTA1' },
  { addr: 'E6.7', label: '' },
  { addr: 'E7.0', label: 'FLP1' },
  { addr: 'E7.1', label: '' },
  { addr: 'E7.2', label: 'FLA1' },
  { addr: 'E7.3', label: '' },
  { addr: 'E7.4', label: 'POD' },
  { addr: 'E7.5', label: 'RXE1' },
  { addr: 'E7.6', label: 'RXE2' },
  { addr: 'E7.7', label: '' },
  { addr: 'E8.0', label: 'EXZE' },
  { addr: 'E8.1', label: 'SPR' },
  { addr: 'E8.2', label: 'EBZE' },
  { addr: 'E8.3', label: 'EBOE' },
  { addr: 'E8.4', label: 'FBBE' },
  { addr: 'E8.5', label: 'ECA1' },
  { addr: 'E8.6', label: 'ECB1' },
  { addr: 'E8.7', label: 'FRE1' },
  { addr: 'E9.0', label: 'ECA2' },
  { addr: 'E9.1', label: 'ECB2' },
  { addr: 'E9.2', label: 'FRE2' },
  { addr: 'E9.3', label: 'FDR3' },
  { addr: 'E9.4', label: 'FDL3' },
  { addr: 'E9.5', label: 'FTA3' },
  { addr: 'E9.6', label: '' },
  { addr: 'E9.7', label: '' },
  { addr: 'E10.0', label: 'EZA' },
  { addr: 'E10.1', label: 'EOA' },
  { addr: 'E10.2', label: 'FBA' },
  { addr: 'E10.3', label: 'FPA' },
  { addr: 'E10.4', label: 'RXA' },
  { addr: 'E10.5', label: '' },
  { addr: 'E10.6', label: 'AMC1' },
  { addr: 'E10.7', label: 'AMC2' },
  { addr: 'E11.0', label: 'APE' },
  { addr: 'E11.1', label: 'APBE' },
  { addr: 'E11.2', label: 'APA' },
  { addr: 'E11.3', label: 'APBA' },
  { addr: 'E11.4', label: '' },
  { addr: 'E11.5', label: '' },
  { addr: 'E11.6', label: '' },
  { addr: 'E11.7', label: '' },
  { addr: 'E12.0', label: 'EXZA' },
  { addr: 'E12.1', label: '' },
  { addr: 'E12.2', label: 'EBZA' },
  { addr: 'E12.3', label: 'EBOA' },
  { addr: 'E12.4', label: 'FBBA' },
  { addr: 'E12.5', label: '' },
  { addr: 'E12.6', label: '' },
  { addr: 'E12.7', label: '' },
  { addr: 'E13.0', label: '' },
  { addr: 'E13.1', label: '' },
  { addr: 'E13.2', label: '' },
  { addr: 'E13.3', label: '' },
  { addr: 'E13.4', label: '' },
  { addr: 'E13.5', label: '' },
  { addr: 'E13.6', label: '' },
  { addr: 'E13.7', label: '' },
  { addr: 'E14.0', label: 'A' },
  { addr: 'E14.1', label: 'B' },
  { addr: 'E14.2', label: 'C' },
  { addr: 'E14.3', label: 'D' },
  { addr: 'E14.4', label: 'OK' },
  { addr: 'E14.5', label: 'S2' },
  { addr: 'E14.6', label: 'S2' },
  { addr: 'E14.7', label: 'S2' },
  { addr: 'E15.0', label: 'SFT2' },
  { addr: 'E15.1', label: 'EXD' },
  { addr: 'E15.2', label: '' },
  { addr: 'E15.3', label: '' },
  { addr: 'E15.4', label: '' },
  { addr: 'E15.5', label: '' },
  { addr: 'E15.6', label: '' },
  { addr: 'E15.7', label: 'UC' },
  { addr: 'E16.0', label: 'EMA' },
  { addr: 'E16.1', label: 'EMB' },
  { addr: 'E16.2', label: 'EXPV' },
  { addr: 'E16.3', label: '' },
  { addr: 'E16.4', label: 'FTXV' },
  { addr: 'E16.5', label: 'FTXH' },
  { addr: 'E16.6', label: 'EOM' },
  { addr: 'E16.7', label: 'EZM' },
  { addr: 'E17.0', label: 'FTV' },
  { addr: 'E17.1', label: '' },
  { addr: 'E17.2', label: '' },
  { addr: 'E17.3', label: '' },
  { addr: 'E17.4', label: 'AMM' },
  { addr: 'E17.5', label: 'MTCA' },
  { addr: 'E17.6', label: 'MTCB' },
  { addr: 'E17.7', label: 'FE3' },
  { addr: 'E18.0', label: 'RESA' },
  { addr: 'E18.1', label: 'REHA' },
  { addr: 'E18.2', label: 'RBVA' },
  { addr: 'E18.3', label: 'RBHA' },
  { addr: 'E18.4', label: 'RCVA' },
  { addr: 'E18.5', label: 'RPLVA' },
  { addr: 'E18.6', label: 'RPLHA' },
  { addr: 'E18.7', label: 'AF8A' },
  { addr: 'E19.0', label: 'RESB' },
  { addr: 'E19.1', label: 'REHB' },
  { addr: 'E19.2', label: 'RBVB' },
  { addr: 'E19.3', label: 'RBHB' },
  { addr: 'E19.4', label: 'RCVB' },
  { addr: 'E19.5', label: 'RPLVB' },
  { addr: 'E19.6', label: 'RPLHB' },
  { addr: 'E19.7', label: 'AF8B' }
]
exports.outputs1 = [
  { addr: 'A0.0', label: 'DYA' },
  { addr: 'A0.1', label: 'DYB' },
  { addr: 'A0.2', label: 'DYC' },
  { addr: 'A0.3', label: 'DYD' },
  { addr: 'A0.4', label: 'AD1' },
  { addr: 'A0.5', label: 'AD2' },
  { addr: 'A0.6', label: 'AD3' },
  { addr: 'A0.7', label: 'STR' },
  { addr: 'A1.0', label: 'STO11' },
  { addr: 'A1.1', label: 'STO12' },
  { addr: 'A1.2', label: 'TD' },
  { addr: 'A1.3', label: '' },
  { addr: 'A1.4', label: 'SBK1' },
  { addr: 'A1.5', label: 'LS' },
  { addr: 'A1.6', label: 'LA' },
  { addr: 'A1.7', label: 'LC' },
  { addr: 'A2.0', label: 'L1' },
  { addr: 'A2.1', label: 'L2' },
  { addr: 'A2.2', label: 'L3' },
  { addr: 'A2.3', label: 'L4' },
  { addr: 'A2.4', label: 'L5' },
  { addr: 'A2.5', label: 'RFE' },
  { addr: 'A2.6', label: 'RLE' },
  { addr: 'A2.7', label: 'RBE' },
  { addr: 'A3.0', label: 'LKE' },
  { addr: 'A3.1', label: 'LEE' },
  { addr: 'A3.2', label: 'LBE' },
  { addr: 'A3.3', label: 'RDYE' },
  { addr: 'A3.4', label: 'RSTE' },
  { addr: 'A3.5', label: '' },
  { addr: 'A3.6', label: '' },
  { addr: 'A3.7', label: '' },
  { addr: 'A4.0', label: '' },
  { addr: 'A4.1', label: '' },
  { addr: 'A4.2', label: '' },
  { addr: 'A4.3', label: '' },
  { addr: 'A4.4', label: '' },
  { addr: 'A4.5', label: 'RFU' },
  { addr: 'A4.6', label: 'RLU' },
  { addr: 'A4.7', label: 'RBU' },
  { addr: 'A5.0', label: 'LKA' },
  { addr: 'A5.1', label: 'LEA' },
  { addr: 'A5.2', label: 'LBA' },
  { addr: 'A5.3', label: 'RDYA' },
  { addr: 'A5.4', label: 'RSTA' },
  { addr: 'A5.5', label: '' },
  { addr: 'A5.6', label: '' },
  { addr: 'A5.7', label: '' },
  { addr: 'A6.0', label: 'STO21' },
  { addr: 'A6.1', label: 'STO22' },
  { addr: 'A6.2', label: '' },
  { addr: 'A6.3', label: 'KQA' },
  { addr: 'A6.4', label: 'TIV1' },
  { addr: 'A6.5', label: 'TIV2' },
  { addr: 'A6.6', label: 'SBK2' },
  { addr: 'A6.7', label: '' },
  { addr: 'A7.0', label: '' },
  { addr: 'A7.1', label: '' },
  { addr: 'A7.2', label: '' },
  { addr: 'A7.3', label: '' },
  { addr: 'A7.4', label: 'SCA1' },
  { addr: 'A7.5', label: 'SCB1' },
  { addr: 'A7.6', label: 'SCA2' },
  { addr: 'A7.7', label: 'SCB2' },
  { addr: 'A8.0', label: 'SPE' },
  { addr: 'A8.1', label: 'SZE' },
  { addr: 'A8.2', label: 'SOE' },
  { addr: 'A8.3', label: 'KXPE' },
  { addr: 'A8.4', label: 'SBZE' },
  { addr: 'A8.5', label: 'SBOE' },
  { addr: 'A8.6', label: '' },
  { addr: 'A8.7', label: '' },
  { addr: 'A9.0', label: 'SPA' },
  { addr: 'A9.1', label: 'SZA' },
  { addr: 'A9.2', label: 'SOA' },
  { addr: 'A9.3', label: 'KXPA' },
  { addr: 'A9.4', label: 'SBPA' },
  { addr: 'A9.5', label: 'SBZA' },
  { addr: 'A9.6', label: 'SBOA' },
  { addr: 'A9.7', label: '' },
  { addr: 'A10.0', label: 'DYA' },
  { addr: 'A10.1', label: 'DYB' },
  { addr: 'A10.2', label: 'DYC' },
  { addr: 'A10.3', label: 'DYD' },
  { addr: 'A10.4', label: 'AD1' },
  { addr: 'A10.5', label: 'AD2' },
  { addr: 'A10.6', label: 'AD3' },
  { addr: 'A10.7', label: 'STR' },
  { addr: 'A11.0', label: 'SMA' },
  { addr: 'A11.1', label: 'SMB' },
  { addr: 'A11.2', label: '' },
  { addr: 'A11.3', label: '' },
  { addr: 'A11.4', label: '' },
  { addr: 'A11.5', label: '' },
  { addr: 'A11.6', label: 'LA' },
  { addr: 'A11.7', label: 'LC' },
  { addr: 'A12.0', label: 'T2A' },
  { addr: 'A12.1', label: 'TRAA' },
  { addr: 'A12.2', label: 'TRBA' },
  { addr: 'A12.3', label: 'TSA' },
  { addr: 'A12.4', label: 'TBVA' },
  { addr: 'A12.5', label: 'TBHA' },
  { addr: 'A12.6', label: 'TCA' },
  { addr: 'A12.7', label: '' },
  { addr: 'A13.0', label: 'T2B' },
  { addr: 'A13.1', label: 'TRAB' },
  { addr: 'A13.2', label: 'TRBB' },
  { addr: 'A13.3', label: 'TSB' },
  { addr: 'A13.4', label: 'TBVB' },
  { addr: 'A13.5', label: 'TBHB' },
  { addr: 'A13.6', label: 'TCB' },
  { addr: 'A13.7', label: '' }
]
exports.ALARMS = [
  { id: 1, key: '', query: {} },
  { id: 2, key: '', query: {} },
  { id: 3, key: '', query: {} },
  { id: 4, key: '', query: {} },
  { id: 5, key: '', query: {} },
  { id: 6, key: '', query: {} },
  { id: 7, key: '', query: {} },
  { id: 8, key: '', query: {} },
  { id: 9, key: '', query: {} },
  { id: 10, key: '', query: {} },
  { id: 11, key: '', query: {} },
  { id: 12, key: '', query: {} },
  { id: 13, key: '', query: {} },
  { id: 14, key: '', query: {} },
  { id: 15, key: '', query: {} },
  { id: 16, key: 'al-sil-16', query: {} },
  { id: 17, key: 'al-flap-to', query: {} },
  { id: 18, key: 'al-flap-fc', query: {} },
  { id: 19, key: 'al-flap-to', query: {} },
  { id: 20, key: 'al-flap-fc', query: {} },
  { id: 21, key: 'al-sp-to', query: {} },
  { id: 22, key: 'al-sp-to', query: {} },
  { id: 23, key: 'al-sp-fc', query: {} },
  { id: 24, key: 'al-spb-to', query: {} },
  { id: 25, key: 'al-spb-to', query: {} },
  { id: 26, key: 'al-spb-fc', query: {} },
  { id: 27, key: '', query: {} },
  { id: 28, key: '', query: {} },
  { id: 29, key: '', query: {} },
  { id: 30, key: '', query: {} },
  { id: 31, key: '', query: {} },
  { id: 32, key: '', query: {} },
  { id: 33, key: '', query: {} },
  { id: 34, key: '', query: {} },
  { id: 35, key: '', query: {} },
  { id: 36, key: '', query: {} },
  { id: 37, key: '', query: {} },
  { id: 38, key: '', query: {} },
  { id: 39, key: '', query: {} },
  { id: 40, key: '', query: {} },
  { id: 41, key: '', query: {} },
  { id: 42, key: '', query: {} },
  { id: 43, key: '', query: {} },
  { id: 44, key: '', query: {} },
  { id: 45, key: '', query: {} },
  { id: 46, key: '', query: {} },
  { id: 47, key: '', query: {} },
  { id: 48, key: '', query: {} },
  { id: 49, key: 'al-th', query: { name: 'AMC1' } },
  { id: 50, key: 'al-th', query: { name: 'AMC2' } },
  { id: 51, key: 'al-th', query: { name: 'AP' } },
  { id: 52, key: 'al-th', query: { name: 'APB' } },
  { id: 53, key: '', query: {} },
  { id: 54, key: '', query: {} },
  { id: 55, key: '', query: {} },
  { id: 56, key: '', query: {} },
  { id: 57, key: '', query: {} },
  { id: 58, key: '', query: {} },
  { id: 59, key: '', query: {} },
  { id: 60, key: '', query: {} },
  { id: 61, key: '', query: {} },
  { id: 62, key: '', query: {} },
  { id: 63, key: '', query: {} },
  { id: 64, key: '', query: {} },
  { id: 65, key: 'al-sil-01', query: {} },
  { id: 66, key: 'al-sil-02', query: {} },
  { id: 67, key: 'al-sil-03', query: {} },
  { id: 68, key: 'al-sil-04', query: {} },
  { id: 69, key: 'al-sil-05', query: {} },
  { id: 70, key: 'al-sil-06', query: {} },
  { id: 71, key: 'al-sil-07', query: {} },
  { id: 72, key: 'al-sil-08', query: {} },
  { id: 73, key: 'al-sil-09', query: {} },
  { id: 74, key: 'al-sil-10', query: {} },
  { id: 75, key: 'al-sil-11', query: {} },
  { id: 76, key: 'al-sil-12', query: {} },
  { id: 77, key: 'al-sil-13', query: {} },
  { id: 78, key: 'al-sil-14', query: {} },
  { id: 79, key: 'al-sil-15', query: {} },
  { id: 80, key: 'al-sil-16', query: {} },
  { id: 81, key: 'al-v-to', query: {} },
  { id: 82, key: 'al-v-fdbk', query: {} },
  { id: 83, key: 'al-lv', query: {} },
  { id: 84, key: 'al-lv-diff', query: {} },
  { id: 85, key: '', query: {} },
  { id: 86, key: '', query: {} },
  { id: 87, key: '', query: {} },
  { id: 88, key: 'al-r-to', query: {} },
  { id: 89, key: 'al-enr', query: {} },
  { id: 90, key: 'al-lck-to', query: {} },
  { id: 91, key: 'al-lck-fc', query: {} },
  { id: 92, key: '', query: {} },
  { id: 93, key: '', query: {} },
  { id: 94, key: '', query: {} },
  { id: 95, key: '', query: {} },
  { id: 96, key: '', query: {} },
  { id: 97, key: '', query: {} },
  { id: 98, key: '', query: {} },
  { id: 99, key: '', query: {} },
  { id: 100, key: '', query: {} },
  { id: 101, key: '', query: {} },
  { id: 102, key: '', query: {} },
  { id: 103, key: '', query: {} },
  { id: 104, key: '', query: {} },
  { id: 105, key: '', query: {} },
  { id: 106, key: '', query: {} },
  { id: 107, key: '', query: {} },
  { id: 108, key: '', query: {} },
  { id: 109, key: '', query: {} },
  { id: 110, key: '', query: {} },
  { id: 111, key: '', query: {} },
  { id: 112, key: '', query: {} },
  { id: 113, key: 'al-th', query: { name: 'FE' } },
  { id: 114, key: 'al-iv', query: { nr: 1 } },
  { id: 115, key: 'al-iv', query: { nr: 2 } },
  { id: 116, key: 'al-th', query: { name: 'AIV1' } },
  { id: 117, key: 'al-th', query: { name: 'AIV2' } },
  { id: 118, key: 'al-th', query: { name: 'AF7' } },
  { id: 119, key: 'al-th', query: { name: 'AKKP' } },
  { id: 120, key: 'al-th', query: { name: 'ASBK1' } },
  { id: 121, key: 'al-th', query: { name: 'ASBK2' } },
  { id: 122, key: 'al-th', query: { name: 'RTA' } },
  { id: 123, key: 'al-th', query: { name: 'AD' } },
  { id: 124, key: 'al-th', query: { name: 'FE3' } },
  { id: 125, key: 'al-th', query: { name: 'AMM' } },
  { id: 126, key: 'al-th', query: { name: 'MTCA' } },
  { id: 127, key: 'al-th', query: { name: 'MTCB' } },
  { id: 128, key: '', query: {} }
]
exports.DEVICES = [
  { id: 0, key: 'operator' },
  { id: 1, key: 'E1' },
  { id: 2, key: 'U1' },
  { id: 3, key: 'T' }
]
exports.MODES = [
  { id: 0, key: 'mode-no' },
  { id: 1, key: 'mode-data-edit' },
  { id: 2, key: 'mode-data-read' },
  { id: 3, key: 'mode-eme-1' },
  { id: 4, key: 'mode-eme-2' },
  { id: 5, key: 'mode-no' },
  { id: 6, key: 'mode-step' },
  { id: 7, key: 'mode-preset' },
  { id: 8, key: 'mode-auto' }
]
exports.OPERATIONS = [
  { id: 0, key: 'op-no' },
  { id: 1, key: 'op-alarm-on' },
  { id: 2, key: 'op-alarm-off' },
  { id: 3, key: 'op-switch-mode' },
  { id: 4, key: 'op-change-pin' },
  { id: 5, key: 'op-stall-in' },
  { id: 6, key: 'op-stall-out' },
  { id: 7, key: 'op-shuffle-in' },
  { id: 8, key: 'op-shuffle-out' },
  { id: 9, key: 'op-stall-rsv' },
  { id: 10, key: 'op-req-exit' },
  { id: 11, key: 'op-req-entry' },
  { id: 12, key: 'op-no' },
  { id: 13, key: 'op-no' },
  { id: 14, key: 'op-no' },
  { id: 15, key: 'op-no' }
]
