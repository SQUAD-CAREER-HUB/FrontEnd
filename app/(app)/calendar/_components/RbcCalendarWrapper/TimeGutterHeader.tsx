export default function TimeGutterHeader() {
  return (
    <div className='flex h-full flex-col'>
      {/* 상단 빈 공간 (시간 컬럼과 정렬 맞춤용) 
      주간 캘린더 일때만 공간 활성화 해야함*/}
      <div className='h-[48px] border-b' />

      {/* 종일 */}
      <div className='flex-1 text-xs font-medium text-muted-foreground flex items-center justify-center'>
        All day
      </div>
    </div>
  );
}
