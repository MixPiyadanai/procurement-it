<template>
  <div>
    <v-tabs
      fixed-tabs
      class="mb-4 rounded-lg navbar-sticky elevation-2"
      dark
      v-model="tab"
      background-color="indigo"
    >
      <v-tab class="d-flex align-center" href="#index">
        <v-icon class="mr-2">mdi-home</v-icon>
        <span class="font-weight-bold" style="font-size: larger">หน้าหลัก</span>
      </v-tab>
      <v-tab
        class="d-flex align-center"
        href="#officeItems"
        :disabled="!isDataLoaded"
      >
        <v-icon class="mr-2">mdi-chair-rolling</v-icon>
        <span class="font-weight-bold" style="font-size: larger">สำนักงาน</span>
      </v-tab>
      <v-tab
        class="d-flex align-center"
        href="#singleTeacher"
        :disabled="!isDataLoaded"
      >
        <v-icon class="mr-2">mdi-account</v-icon>
        <span class="font-weight-bold" style="font-size: larger">อาจารย์</span>
      </v-tab>
      <v-tab
        class="d-flex align-center"
        href="#multiTeacher"
        :disabled="!isDataLoaded"
      >
        <v-icon class="mr-2">mdi-account-group</v-icon>
        <span class="font-weight-bold" style="font-size: larger"
          >รวมอาจารย์</span
        >
      </v-tab>
      <v-tab
        class="d-flex align-center"
        href="#summary"
        :disabled="!isDataLoaded"
      >
        <v-icon class="mr-2">mdi-view-list</v-icon>
        <span class="font-weight-bold" style="font-size: larger"
          >รายละเอียด</span
        >
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="index">
        <v-row>
          <v-col cols="12">
            <v-dialog v-model="uploadJsonOverlay" persistent width="450">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  block
                  large
                  class="mb-2"
                >
                  <v-icon left>mdi-import</v-icon>
                  <span class="font-weight-bold">นำเข้าไฟล์บันทึก</span>
                </v-btn>
              </template>
              <v-card light>
                <v-card-title>
                  <span>นำเข้าบันทึกข้อมูลรายการจัดซื้อจัดจ้าง</span>
                </v-card-title>
                <v-card-text>
                  <v-file-input
                    accept="application/json"
                    label="เลือกไฟล์บันทึก JSON"
                    prepend-icon="mdi-code-json"
                    @change="handleFileUpload"
                    clearable
                    v-model="jsonFile"
                  ></v-file-input>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="accent" text @click="uploadJsonOverlay = false">
                    ยกเลิก
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="handleUploadJsonSuccess('new')"
                  >
                    เริ่มต้นใหม่
                  </v-btn>
                  <v-btn
                    color="success"
                    :disabled="!isJsonSuccessUpload"
                    @click="handleUploadJsonSuccess('load')"
                    >โหลดบันทึก</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn
              block
              color="primary lighten-2"
              @click="exportSaveData"
              large
              class="mb-2"
              :disabled="!isDataLoaded"
            >
              <v-icon left>mdi-export</v-icon>
              <span class="font-weight-bold">ส่งออกไฟล์บันทึก</span>
            </v-btn>
            <v-dialog v-model="wipeFieldOverlay" persistent width="400">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="error"
                  v-bind="attrs"
                  v-on="on"
                  block
                  large
                  class="mb-2"
                  :disabled="!isDataLoaded"
                >
                  <v-icon left>mdi-alert-outline</v-icon>
                  <span class="font-weight-bold">ล้างข้อมูล</span>
                </v-btn>
              </template>
              <v-card light class="d-flex flex-column pt-8">
                <v-icon style="font-size: 10rem" color="error darken-1">
                  mdi-alert
                </v-icon>
                <span class="text-center" style="font-size: 1.5rem"
                  >ล้างข้อมูลที่กำลังแสดงผลทั้งหมด</span
                >
                <v-divider class="mt-8"></v-divider>

                <v-card-actions class="d-flex justify-end">
                  <v-btn
                    color="accent"
                    @click="wipeFieldOverlay = false"
                    depressed
                  >
                    ยกเลิก
                  </v-btn>
                  <v-btn @click="wipeSaveData" text color="error"
                    >ล้างข้อมูล</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item value="officeItems">
        <v-row>
          <v-col
            cols="12"
            v-if="SaveData.office && SaveData.office.list"
            class="mb-16 pb-16 pt-8"
          >
            <v-card class="rounded-xl elevation-2 px-8 pt-4 pb-8" outlined>
              <fieldset class="mt-3 mb-5 pa-4 rounded-lg elevation-2">
                <legend class="ml-1 px-2">
                  รายการวัสดุสำนักงาน
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="black"
                        dense
                        dark
                        v-bind="attrs"
                        v-on="on"
                        class="ml-1"
                      >
                        mdi-information-outline
                      </v-icon>
                    </template>
                    <span>สามารถคลิกที่รายการเพื่อแก้ไขได้</span>
                  </v-tooltip>
                </legend>
                <div class="legend-right-office">
                  <v-btn
                    color="success darken-1"
                    class="px-2"
                    text
                    @click="addItems(-1, 'office')"
                  >
                    <v-icon> mdi-plus </v-icon>
                    เพิ่มพัสดุ
                  </v-btn>
                </div>

                <v-data-table
                  :hide-default-header="
                    SaveData.office.list[0].items.length === 0
                  "
                  hide-default-footer
                  :headers="itemsHeader"
                  :items="SaveData.office.list[0].items"
                  :items-per-page="9999"
                >
                  <template v-slot:header.actions="{ header }">
                    <v-icon
                      @click="deleteAllItems(-1, 'office')"
                      small
                      color="error"
                    >
                      {{ header.text }}
                    </v-icon>
                  </template>
                  <template v-slot:no-data> ยังไม่ได้เพิ่มพัสดุ </template>
                  <template v-slot:item.index="props">
                    {{ props.index + 1 }}
                  </template>
                  <template v-slot:item.name="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.name"
                      large
                      persistent
                    >
                      <div class="py-2">{{ props.item.name }}</div>
                      <template v-slot:input>
                        <v-text-field
                          v-model="props.item.name"
                          :rules="[required]"
                          single-line
                          autofocus
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.quantity="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.quantity"
                      large
                      persistent
                    >
                      <div>{{ props.item.quantity }}</div>
                      <template v-slot:input>
                        <v-text-field
                          v-model="props.item.quantity"
                          :rules="[required, isNumeric, max8chars]"
                          single-line
                          autofocus
                          counter="8"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.price="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.price"
                      large
                      persistent
                    >
                      <div>{{ formatPrice(props.item.price) }}</div>
                      <template v-slot:input>
                        <v-text-field
                          v-model="props.item.price"
                          :rules="[required, isFloat]"
                          single-line
                          autofocus
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.unit="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.unit"
                      large
                      persistent
                    >
                      <div>{{ props.item.unit }}</div>
                      <template v-slot:input>
                        <v-text-field
                          v-model="props.item.unit"
                          :rules="[required]"
                          single-line
                          autofocus
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.total="{ item }">
                    {{
                      isNaN(item.quantity) || isNaN(item.price)
                        ? Math.floor(0).toFixed(2)
                        : (item.price * Math.floor(item.quantity)).toFixed(2)
                    }}
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-icon small @click="deleteItem(-1, item, 'office')">
                      mdi-delete
                    </v-icon>
                  </template>
                  <template v-slot:footer>
                    <v-divider />
                    <div class="d-flex flex-column pr-4">
                      <p class="mt-3 mb-0 text-right">
                        จำนวนวัสดุทั้งหมด
                        <span class="font-weight-bold">
                          {{
                            SaveData.office.list[0].items.reduce(
                              (sum, item) =>
                                sum + (parseInt(item.quantity) || 0),
                              0
                            )
                          }}
                        </span>
                        รายการ
                      </p>
                      <p class="mt-2 mb-0 text-right">
                        ราคารวมทั้งหมด
                        <span class="font-weight-bold">
                          {{
                            SaveData.office.list[0].items
                              .reduce(
                                (sum, item) =>
                                  sum +
                                  (item.price * Math.floor(item.quantity) ||
                                    0.0),
                                0
                              )
                              .toFixed(2)
                          }}
                        </span>
                        บาท
                      </p>
                      <p class="mt-2 text-right">
                        ราคารวมทั้งหมด
                        <span class="font-weight-bold">
                          {{
                            BahtText(
                              SaveData.office.list[0].items
                                .reduce(
                                  (sum, item) =>
                                    sum +
                                    (item.price * Math.floor(item.quantity) ||
                                      0.0),
                                  0
                                )
                                .toFixed(2)
                            )
                          }}
                        </span>
                        บาทไทย
                      </p>
                    </div>
                  </template>
                </v-data-table>
              </fieldset>
              <div class="d-flex justify-end">
                <v-menu offset-y transition="slide-y-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      depressed
                    >
                      <v-icon left> mdi-printer </v-icon>
                      พิมพ์รายการ
                    </v-btn>
                  </template>
                  <v-list class="py-0">
                    <v-list-item>
                      <v-list-item-title class="px-0">
                        <v-btn text block @click="exportPDF(-1, 'office')">
                          PDF
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                    <v-divider />
                    <v-list-item>
                      <v-list-item-title>
                        <v-btn text block> Excel </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item value="singleTeacher">
        <v-row>
          <v-col :sm="3" :cols="12">
            <v-card outlined class="py-2 rounded-xl elevation-2">
              <v-card-title>รายชื่ออาจารย์</v-card-title>
              <v-divider class="mb-4" />
              <v-navigation-drawer
                permanent
                floating
                class="px-4"
                style="width: 100%"
                v-if="SaveData.data && SaveData.data.list"
              >
                <v-list dense>
                  <v-list-item
                    v-for="(teacher, index) in SaveData.data.list"
                    :key="index"
                    class="d-flex align-center"
                  >
                    <v-list-item-icon class="mr-2">
                      <v-icon>mdi-minus</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{ teacher.teacher_name }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </v-col>
          <v-col :sm="9" class="pb-16 mb-16">
            <div v-if="SaveData.data && SaveData.data.list">
              <v-card
                v-for="(data, index) in SaveData.data.list"
                :key="index"
                class="mb-6 rounded-xl elevation-2 pt-4 pb-8"
                outlined
              >
                <div class="delete-teacher">
                  <v-btn
                    color="error"
                    depressed
                    x-small
                    style="
                      border-radius: 0px 16px 0px 8px;
                      height: 25px;
                      width: 20px;
                    "
                    @click="deleteTeacher(index)"
                  >
                    <v-icon dense> mdi-close </v-icon>
                  </v-btn>
                </div>
                <v-card-text class="pb-0 px-8 d-flex align-center">
                  <span class="mr-2">ชื่ออาจารย์:</span>
                  <v-text-field
                    outlined
                    dense
                    class="pt-0 mt-0"
                    label="ชื่ออาจารย์"
                    single-line
                    v-model="data.teacher_name"
                    hide-details
                  ></v-text-field>
                </v-card-text>
                <v-card-text class="pb-0 px-8 d-flex align-center">
                  <span class="mr-2">รายวิชา:</span>
                  <v-text-field
                    outlined
                    dense
                    class="pt-0 mt-0"
                    label="รายวิชา"
                    single-line
                    v-model="data.subject"
                    hide-details
                  ></v-text-field>
                </v-card-text>
                <v-divider class="mt-6" />
                <fieldset class="mt-6 mx-8 mb-4 pa-4 rounded-lg elevation-2">
                  <legend class="ml-1 px-2">
                    รายการวัสดุ
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          color="black"
                          dense
                          dark
                          v-bind="attrs"
                          v-on="on"
                          class="ml-1"
                        >
                          mdi-information-outline
                        </v-icon>
                      </template>
                      <span>สามารถคลิกที่รายการเพื่อแก้ไขได้</span>
                    </v-tooltip>
                  </legend>
                  <div class="legend-right-single">
                    <v-btn
                      color="success darken-1"
                      class="px-2"
                      text
                      @click="addItems(index, 'single')"
                    >
                      <v-icon> mdi-plus </v-icon>
                      เพิ่มพัสดุ
                    </v-btn>
                  </div>
                  <v-data-table
                    :hide-default-header="data.items.length === 0"
                    hide-default-footer
                    :headers="itemsHeader"
                    :items="data.items"
                    :items-per-page="9999"
                  >
                    <template v-slot:header.actions="{ header }">
                      <v-icon
                        @click="deleteAllItems(index, 'single')"
                        small
                        color="error"
                      >
                        {{ header.text }}
                      </v-icon>
                    </template>
                    <template v-slot:no-data> ยังไม่ได้เพิ่มพัสดุ </template>
                    <template v-slot:item.index="props">
                      {{ props.index + 1 }}
                    </template>
                    <template v-slot:item.name="props">
                      <v-edit-dialog
                        :return-value.sync="props.item.name"
                        large
                        persistent
                      >
                        <div class="py-2">{{ props.item.name }}</div>
                        <template v-slot:input>
                          <v-text-field
                            v-model="props.item.name"
                            :rules="[required]"
                            single-line
                            autofocus
                          ></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </template>
                    <template v-slot:item.quantity="props">
                      <v-edit-dialog
                        :return-value.sync="props.item.quantity"
                        large
                        persistent
                      >
                        <div>{{ props.item.quantity }}</div>
                        <template v-slot:input>
                          <v-text-field
                            v-model="props.item.quantity"
                            :rules="[required, isNumeric, max8chars]"
                            single-line
                            autofocus
                            counter="8"
                          ></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </template>
                    <template v-slot:item.price="props">
                      <v-edit-dialog
                        :return-value.sync="props.item.price"
                        large
                        persistent
                      >
                        <div>{{ formatPrice(props.item.price) }}</div>
                        <template v-slot:input>
                          <v-text-field
                            v-model="props.item.price"
                            :rules="[required, isFloat]"
                            single-line
                            autofocus
                          ></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </template>
                    <template v-slot:item.unit="props">
                      <v-edit-dialog
                        :return-value.sync="props.item.unit"
                        large
                        persistent
                      >
                        <div>{{ props.item.unit }}</div>
                        <template v-slot:input>
                          <v-text-field
                            v-model="props.item.unit"
                            :rules="[required]"
                            single-line
                            autofocus
                          ></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </template>
                    <template v-slot:item.total="{ item }">
                      {{
                        isNaN(item.quantity) || isNaN(item.price)
                          ? Math.floor(0).toFixed(2)
                          : (item.price * Math.floor(item.quantity)).toFixed(2)
                      }}
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-icon small @click="deleteItem(index, item, 'single')">
                        mdi-delete
                      </v-icon>
                    </template>
                    <template v-slot:footer>
                      <v-divider />
                      <div class="d-flex flex-column pr-4">
                        <p class="mt-3 mb-0 text-right">
                          จำนวนวัสดุทั้งหมด
                          <span class="font-weight-bold">
                            {{
                              data.items.reduce(
                                (sum, item) =>
                                  sum + (parseInt(item.quantity) || 0),
                                0
                              )
                            }}
                          </span>
                          รายการ
                        </p>
                        <p class="mt-2 mb-0 text-right">
                          ราคารวมทั้งหมด
                          <span class="font-weight-bold">
                            {{
                              data.items
                                .reduce(
                                  (sum, item) =>
                                    sum +
                                    (item.price * Math.floor(item.quantity) ||
                                      0),
                                  0
                                )
                                .toFixed(2)
                            }}
                          </span>
                          บาท
                        </p>
                        <p class="mt-2 text-right">
                          ราคารวมทั้งหมด
                          <span class="font-weight-bold">
                            {{
                              BahtText(
                                data.items
                                  .reduce(
                                    (sum, item) =>
                                      sum +
                                      (item.price * Math.floor(item.quantity) ||
                                        0),
                                    0
                                  )
                                  .toFixed(2)
                              )
                            }}
                          </span>
                          บาทไทย
                        </p>
                      </div>
                    </template>
                  </v-data-table>
                </fieldset>
                <div class="d-flex justify-end px-8">
                  <v-menu offset-y transition="slide-y-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        depressed
                      >
                        <v-icon left> mdi-printer </v-icon>
                        พิมพ์รายการ
                      </v-btn>
                    </template>
                    <v-list class="py-0">
                      <v-list-item>
                        <v-list-item-title class="px-0">
                          <v-btn text block @click="exportPDF(index, 'single')">
                            PDF
                          </v-btn>
                        </v-list-item-title>
                      </v-list-item>
                      <v-divider />
                      <v-list-item>
                        <v-list-item-title>
                          <v-btn text block> Excel </v-btn>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </v-card>
            </div>

            <v-btn
              block
              color="success"
              @click="addTeacher"
              large
              depressed
              class="mb-16"
            >
              <v-icon left>mdi-plus</v-icon>
              เพิ่มอาจารย์
            </v-btn>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item value="multiTeacher">
        <v-row>
          <v-col cols="12"> รวมอาจารย์ </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item value="summary"> </v-tab-item>
    </v-tabs-items>
    <v-snackbar
      v-model="snackbar.status"
      :color="snackbar.color"
      bottom
      right
      :timeout="6000"
      multi-line
    >
      <div class="d-flex justify-space-between">
        <v-icon>{{ snackbar.icon }}</v-icon>
        <span class="text-right font-weight-bold" style="font-size: 1.25rem">{{
          snackbar.text
        }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { standardPDF, multiTeacher } from "@/services/pdfExport";
import THBText from "thai-baht-text";

export default {
  name: "IndexPage",
  data() {
    return {
      uploadJsonOverlay: false,
      wipeFieldOverlay: false,
      jsonFile: null,
      fileContent: null,
      isJsonSuccessUpload: false,
      SaveData: [],
      isDataLoaded: false,
      itemsHeader: [
        { text: "#", value: "index", sortable: false },
        { text: "ชื่อวัสดุ", value: "name", sortable: false },
        { text: "จำนวน", value: "quantity", align: "right", sortable: false },
        { text: "ราคา (บาท)", value: "price", align: "right", sortable: false },
        { text: "หน่วยนับ", value: "unit", align: "center", sortable: false },
        {
          text: "ราคารวม (บาท)",
          value: "total",
          align: "right",
          sortable: false,
        },
        {
          text: "mdi-delete",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      snackbar: {
        status: false,
        text: "",
        color: "",
        icon: "",
      },
      tab: "index",
      isNumeric: (v) => /^\d+$/.test(v) || "ต้องเป็นจำนวนเต็ม",
      max8chars: (v) => v.length <= 8 || "ไม่ควรเกิน 8 ตัวอักษร",
      required: (v) => v.length > 0 || "จำเป็นใส่ข้อมูล",
      isFloat: (v) =>
        /^\d+(\.\d{1,2})?$/.test(v) ||
        "ต้องเป็นจำนวนเต็มหรือจำนวนทศนิยม (ไม่ควรเกินสองตำแหน่งทศนิยม)",
    };
  },
  mounted() {
    window.addEventListener("beforeunload", this.confirmBeforeUnload);
    this.uploadJsonOverlay = true;
  },
  computed: {},
  methods: {
    BahtText(number) {
      if (number === Math.floor(0).toFixed(2)) {
        return "ศูนย์บาทถ้วน";
      }
      return THBText(number);
    },
    exportSaveData() {
      if (this.SaveData.metadata.save_key === "") {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let key = "";
        const keyLength = 32;
        for (let i = 0; i < keyLength; i++) {
          key += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        console.log("key:", key);
        this.SaveData.metadata.save_key = key;
      }

      const dateString = new Date().toLocaleDateString("th-TH");
      const fileName = `ไฟล์บันทึกรายละเอียดวัสดุที่จะซื้อหรือจ้าง_ประจำวันที่_${dateString}.json`;

      const jsonString = JSON.stringify(this.SaveData);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    wipeSaveData() {
      this.handleUploadJsonSuccess("new");
      this.wipeFieldOverlay = false;
    },
    addTeacher() {
      if (!this.SaveData.data) {
        // Initialize SaveData with an empty object
        this.SaveData = { data: { list: [] } };
      }
      this.SaveData.data.list.push({
        teacher_name: "",
        subject: "",
        items: [],
      });
    },
    deleteTeacher(teacherIndex) {
      if (
        confirm(
          "คุณต้องการลบอาจารย์นี้ใช่หรือไม่? ข้อมูลที่ไม่ได้บันทึกจะหายไป!"
        )
      ) {
        this.SaveData.data.list.splice(teacherIndex, 1);
      }
    },
    addItems(index, type) {
      switch (type) {
        case "single":
          this.SaveData.data.list[index].items.push({
            name: "",
            price: 0.0,
            quantity: 0,
            unit: "",
          });
          break;
        case "office":
          this.SaveData.office.list[0].items.push({
            name: "",
            price: 0.0,
            quantity: 0,
            unit: "",
          });
          break;
        default:
          break;
      }
    },
    deleteItem(teacherIndex, item, type) {
      let confirmMessage = "คุณต้องการลบสินค้านี้ใช่หรือไม่?!";
      switch (type) {
        case "single":
          if (confirm(confirmMessage)) {
            this.SaveData.data.list[teacherIndex].items.splice(
              this.SaveData.data.list[teacherIndex].items.indexOf(item),
              1
            );
          }
          break;
        case "office":
          if (confirm(confirmMessage)) {
            this.SaveData.office.list[0].items.splice(
              this.SaveData.office.list[0].items.indexOf(item),
              1
            );
          }
          break;
        default:
          break;
      }
    },
    deleteAllItems(index, type) {
      let confirmMessage = "คุณต้องการลบสินค้าทั้งหมดใช่หรือไม่?!";
      switch (type) {
        case "single":
          if (confirm(confirmMessage)) {
            this.SaveData.data.list[index].items = [];
          }
          break;
        case "office":
          if (confirm(confirmMessage)) {
            this.SaveData.office.list[0].items = [];
          }
          break;
        default:
          break;
      }
    },
    formatPrice(price) {
      return typeof price === "number" ? price.toFixed(2) : price;
    },
    handleFileUpload() {
      const file = this.jsonFile;

      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const fileContent = event.target.result;

          try {
            const parsedJson = JSON.parse(fileContent);

            this.jsonContent = parsedJson;

            this.isJsonSuccessUpload = true;
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        };

        reader.readAsText(file);
      }
    },
    handleUploadJsonSuccess(type) {
      if (type === "load") {
        if (this.jsonContent.metadata.version !== "1") {
          this.snackbar.status = true;
          this.snackbar.text = "เวอร์ชั่นของบันทึกไม่ตรงกัน!";
          this.snackbar.color = "error darken-1";
          this.snackbar.icon = "mdi-alert";
          return;
        }
        this.SaveData = [];
        this.SaveData = JSON.parse(JSON.stringify(this.jsonContent));
        this.uploadJsonOverlay = false;
        this.snackbar.status = true;
        this.snackbar.text = "นำเข้าบันทึกสำเร็จ";
        this.snackbar.color = "success darken-1";
        this.snackbar.icon = "mdi-check";
        this.tab = "office";
      } else if (type === "new") {
        const emptyJsonPath = "/empty.json";

        fetch(emptyJsonPath)
          .then((response) => response.json())
          .then((emptyJsonContent) => {
            this.SaveData = JSON.parse(JSON.stringify(emptyJsonContent));
            this.uploadJsonOverlay = false;
            this.snackbar.status = true;
            this.snackbar.text = "สร้างบันทึกใหม่สำเร็จ";
            this.snackbar.color = "success darken-1";
            this.snackbar.icon = "mdi-check";
          })
          .catch((error) => {
            console.error("Error loading empty.json", error);
          });
      }
      this.isDataLoaded = true;
    },
    exportPDF(index, type) {
      switch (type) {
        case "single":
          standardPDF(this.SaveData.data.list[index], "single");
          break;
        case "multi":
          standardPDF(this.SaveData.data.list[index], "multi");
          break;
        case "office":
          standardPDF(this.SaveData.office.list[0], "office");
          break;
        default:
          console.log("unknown type");
          break;
      }
    },
    // exportMultipleTeacherPDF() {
    //   multiTeacher();
    // },
    confirmBeforeUnload(event) {
      if (this.uploadJsonOverlay != true) {
        const confirmationMessage =
          "คุณต้องการออกจากหน้านี้ใช่หรือไม่? ข้อมูลที่ไม่ได้บันทึกจะหายไป!";
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.confirmBeforeUnload);
  },
};
</script>

<style lang="scss" scoped>
.legend-right-single {
  position: absolute;
  top: 10.7em;
  right: 56px;
  background: #fff;
}
.legend-right-office {
  position: absolute;
  top: 1.4em;
  right: 60px;
  background: #fff;
}

.delete-teacher {
  position: absolute;
  top: -0.1em;
  right: 0px;
  z-index: 1;
}

fieldset {
  border: 2px groove #3f51b5;
}

.navbar-sticky {
  position: sticky;
  top: 12px;
  z-index: 2;
}
</style>
