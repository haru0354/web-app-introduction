import Button from "./components/ui/Button";
import InputText from "./components/ui/InputText";
import Modal from "./components/ui/Modal";
import Textarea from "./components/ui/Textarea";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-between w-full max-w-[1140px] mx-auto">
      <div className="w-full max-w-[800px] px-2">
        <h2>main</h2>
        <InputText label="テスト" name="TEST" placeholder="テスト" />
        <Textarea label="テスト" name="TEST" placeholder="テスト" />
        <Button color={"blue"} size={"normal"}>
          追加
        </Button>
        <Button color={"red"} size={"normal"}>
          削除
        </Button>
        <Button color={"gray"} size={"normal"}>
          キャンセル
        </Button>
        <Modal>
          <div>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
          </div>
        </Modal>
      </div>
      <div className="w-full max-w-[300px] px-2">side</div>
    </main>
  );
}
