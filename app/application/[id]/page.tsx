import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PanelRight, Trash2, Save, CirclePlay, Plus, Clock } from 'lucide-react';
import { DropDown } from '@/components/DropDown';
import { ButtonGroup } from '@/components/ui/button-group';
import { Label } from '@/components/ui/label';

export default function JobDetailPage() {
  return (
    <div className='flex flex-1 flex-col p-4'>
      {/* 헤더 섹션 */}
      <div className="sticky top-0 z-30 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm flex items-center justify-between mb-6 -mt-4 -mx-4 px-4 py-4 md:-mt-8 md:-mx-8 md:px-8 border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
        <div>
          <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">비바리퍼블리카 (Toss)</div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">프로덕트 디자이너</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size={'icon'} className='cursor-pointer p-2 rounded-lg transition-colors border border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'>
            <PanelRight className="h-5 w-5 " />
          </Button>
          <div className='h-5 w-px bg-slate-300 dark:bg-slate-700'></div>
          <Button variant="ghost" size={'icon'} className='cursor-pointer p-2 text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors'>
            <Trash2 className="h-5 w-5 " />
          </Button>
          <Button variant={null} size='smButton' className="cursor-pointer bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-brand-200 dark:shadow-none transition-all flex items-center">
            <Save className='w-4 h-4' />
            <span>저장</span>
          </Button>
        </div>
      </div>
      {/* lg-grid-cols-3 */}
      <div className='grid grid-cols-1 gap-6 transition-all duration-300 ease-in-out flex-1 items-stretch'>
        <div className='lg:col-span-2 flex flex-col min-w-0 transition-all'>
          <Card className='p-0 bg-white gap-0 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col overflow-hidden'>
            <CardHeader className='p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center flex-shrink-0 relative'>
              <h2 className='text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center'>
                <CirclePlay className='w-5 h-5 text-brand-500 mr-2' />
                지원 관리 타임라인
              </h2>
              <div className='flex items-center space-x-2 w-40'>
                <div className='text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap'>현재 단계:</div>
                <DropDown />
              </div>
            </CardHeader>
            <CardContent className='p-6 md:p-8 relative flex-1 overflow-y-auto custom-scrollbar'>
              <div className='absolute left-10 md:left-12 top-8 bottom-8 w-0.5 bg-slate-100 dark:bg-slate-800'>
              </div>
              <div className='relative flex gap-6 mb-10 group z-20'>
                <div className='relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center shadow-sm flex-shrink-0 transition-colors
                       bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400'>
                  <span className='text-xs md:text-sm font-bold'>
                    1
                  </span>
                </div>
                {/* <div className='relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center shadow-sm flex-shrink-0 transition-colors bg-green-500 border-green-500 text-white'></div> */}
                <div className='flex-1 rounded-xl p-5 shadow-sm transition-all bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:border-slate-800'>
                  <div className='flex justify-between items-center mb-5'>
                    <h3 className='font-bold text-lg text-green-800 dark:text-green-400'>서류 전형</h3>
                    <ButtonGroup className='flex bg-white/50 dark:bg-slate-800/50 items-center rounded-lg border border-slate-100/50 dark:border-slate-700/50'>
                      <Button variant={'xs'} size={'xs'} className='text-slate-400 hover:text-slate-600'>대기</Button>
                      <Button variant={'xs'} size={'xs'} className='hover:text-green-600'>합격</Button>
                      <Button variant={'xs'} size={'xs'} className='hover:text-red-600'>불합격</Button>
                    </ButtonGroup>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div className='flex flex-col'>
                      <Label htmlFor="payment" className="text-[10px] text-slate-900 dark:text-slate-100 font-bold mb-1.5 ml-1 ">
                        서류 상태 <span className="text-red-500">*</span>
                      </Label>
                      <DropDown />
                    </div>
                    <div className='flex flex-col'>
                      <Label htmlFor="payment" className="text-[10px] text-slate-900 dark:text-slate-100 font-bold mb-1.5 ml-1 ">
                        지원 방식 <span className="text-red-500">*</span>
                      </Label>
                      <DropDown />
                    </div>
                    <div className='flex flex-col'>
                      <Label htmlFor="payment" className="text-[10px] text-slate-900 dark:text-slate-100 font-bold mb-1.5 ml-1 ">
                        마감 일시 <span className="text-red-500">*</span>
                      </Label>
                      <DropDown />
                    </div>
                  </div>
                </div>
              </div>
              <div className='relative flex gap-6 mb-10 group z-20'>
                <div className='relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center shadow-sm flex-shrink-0 transition-colors bg-green-500 border-green-500 text-white'></div>
                <div className='flex-1 transition-opacity opacity-90'>
                  <div className='flex justify-between items-center mb-4'>
                    <h3 className='font-bold text-lg text-slate-900 dark:text-slate-100'>기타 전형</h3>
                    <Button variant={'xs'} size={'xs'} className='text-brand-500 bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/40 px-3 py-1 gap-0 rounded-lg transition-colors'>
                      <Plus className='w-3 h-3 mr-1' />
                      추가</Button>
                  </div>
                  <div className='space-y-3 p-3 rounded-xl transition-all'>
                    <Card className='p-4 rounded-xl shadow-sm transition-all group relative overflow-hidden bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800 dark:bg-slate-900 dark:border-slate-800'>
                      <CardContent className='px-0'>
                        <div className='flex justify-between items-start mb-2'>
                          <div>
                            <h4 className='font-bold text-green-800 dark:text-green-400'>제목</h4>
                          </div>
                          <ButtonGroup className='flex bg-white/50 dark:bg-slate-800/50 items-center rounded-lg border border-slate-100/50 dark:border-slate-700/50'>
                            <Button variant={'xs'} size={'xs'} className='text-slate-400 hover:text-slate-600'>대기</Button>
                            <Button variant={'xs'} size={'xs'} className='hover:text-green-600'>합격</Button>
                            <Button variant={'xs'} size={'xs'} className='hover:text-red-600'>불합격</Button>
                          </ButtonGroup>
                        </div>
                        <div className='flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1'>
                          <Clock className='w-3.5 h-3.5 mr-1.5' />
                          2025. 12. 22. 오전 01:28 ~ 오전 02:28
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              <div className='relative flex gap-6 mb-10 group z-20'>
                <div className='relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center shadow-sm flex-shrink-0 transition-colors bg-green-500 border-green-500 text-white'></div>
                <div className='flex-1 transition-opacity opacity-90'>
                  <div className='flex justify-between items-center mb-4'>
                    <h3 className='font-bold text-lg text-slate-900 dark:text-slate-100'>기타 전형</h3>
                    <Button variant={'xs'} size={'xs'} className='text-brand-500 bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/40 gap-0 rounded-lg transition-colors'>
                      <Plus className='w-3 h-3 mr-1' />
                      추가</Button>
                  </div>
                  <div className='space-y-3 p-3 rounded-xl transition-all'>
                    <Card className='p-4 rounded-xl shadow-sm transition-all group relative overflow-hidden bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800 dark:bg-slate-900 dark:border-slate-800'>
                      <CardContent className='px-0'>
                        <div className='flex justify-between items-start mb-2'>
                          <div>
                            <h4 className='font-bold text-green-800 dark:text-green-400'>제목</h4>
                          </div>
                          <ButtonGroup className='flex bg-white/50 dark:bg-slate-800/50 items-center rounded-lg border border-slate-100/50 dark:border-slate-700/50'>
                            <Button variant={'xs'} size={'xs'} className='text-slate-400 hover:text-slate-600'>대기</Button>
                            <Button variant={'xs'} size={'xs'} className='hover:text-green-600'>합격</Button>
                            <Button variant={'xs'} size={'xs'} className='hover:text-red-600'>불합격</Button>
                          </ButtonGroup>
                        </div>
                        <div className='flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1'>
                          <Clock className='w-3.5 h-3.5 mr-1.5' />
                          2025. 12. 22. 오전 01:28 ~ 오전 02:28
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              <div className='relative flex gap-6 mb-10 group z-20'>
                <div className='relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center shadow-sm flex-shrink-0 transition-colors bg-green-500 border-green-500 text-white'></div>
                <div className='flex-1 rounded-xl p-5 border shadow-sm flex justify-between items-center transition-colors
                       bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900'>
                  <div>
                    <h3 className='font-bold text-lg text-red-800 dark:text-red-400'>최종 불합격</h3>
                  </div>
                    <div className='flex gap-2'>
                      <Button variant={'xs'} size={'xs'} className='bg-green-500 text-white border-green-500 shadow-sm'>합격 처리</Button>
                      <Button variant={'xs'} size={'xs'} className='bg-white dark:bg-slate-800 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'>불합격 처리</Button>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}