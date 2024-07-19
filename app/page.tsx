import InputText from "./components/ui/InputText";
import Textarea from "./components/ui/Textarea";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-between w-full max-w-[1140px] mx-auto">
      <div className="w-full max-w-[800px] px-2">
       <h2>main</h2>
        <InputText label="テスト" name="TEST" placeholder="テスト" />
        <Textarea label="テスト" name="TEST" placeholder="テスト" />
      </div>
      <div className="w-full max-w-[300px] px-2">side</div>
    </main>
  );
}
