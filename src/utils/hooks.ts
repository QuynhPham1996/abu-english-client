import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { TCommonPaginate } from '@/common/types';
import { TSelectOption } from '@/components/Select';
// import { EDeleteFilesAction, EUploadFilesAction, deleteFilesAction, uploadFilesAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
// import { TUploadFilesResponse } from '@/services/api';
import { getTotalPage } from '@/utils/functions';
import { Router } from 'next/router';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return (): void => {
      clearTimeout(handleDebounce);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useWindowScrollEnd = () => {
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const onScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    const isScrollEnd = Math.round(scrollTop + clientHeight) >= scrollHeight;
    setIsEnd(isScrollEnd);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true } as any);

    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true } as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isEnd;
};

export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent): void => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return (): void => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export const useImageLoaded = (): [any, boolean, (modifiedLoaded?: boolean) => void] => {
  const [loaded, setLoaded] = useState(false);
  const ref: any = useRef();

  const onLoad = (modifiedLoaded?: boolean): void => {
    if (typeof modifiedLoaded === 'boolean') setLoaded(modifiedLoaded);
    else setLoaded(true);
  };

  return [ref, loaded, onLoad];
};

export const usePaginationTool = (data: {
  initialParams?: { [key: string]: any };
  action: any;
  reducer: string;
  response: string;
  loadingAction: string;
  materials?: { [key: string]: any };
  availableToCall?: boolean;
}): {
  paramsRequest: {
    page: number;
    pageSize: number;
    sorter?: string;
    search?: string;
    [key: string]: any;
  };
  state: TCommonPaginate & { data: any };
  loading: boolean;
  getData: () => void;
  setParamsRequest: (data: any) => void;
  handleSearch: (keyword?: string) => void;
  handlePaginationChange: (page: number, pageSize: number, sorter?: string) => void;
} => {
  const dispatch = useDispatch();

  const state = useSelector((state: any) => state?.[data?.reducer]?.[data.response]);
  const loading = useSelector((state: any) => state.loadingReducer[data.loadingAction]);

  const [paramsRequest, setParamsRequest] = useState<{
    page: number;
    pageSize: number;
    sorter?: string;
    search?: string;
    [key: string]: any;
  }>({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const handleSearch = (keyword?: string): void => {
    setParamsRequest({
      ...paramsRequest,
      page: DEFAULT_PAGE,
      search: keyword || undefined,
    });
  };

  const handlePaginationChange = (page: number, pageSize: number, sorter?: string): void => {
    setParamsRequest({ ...paramsRequest, page, pageSize, sort: sorter });
  };

  const getData = useCallback(() => {
    if (typeof data?.availableToCall !== 'boolean' || data?.availableToCall) {
      dispatch(
        data?.action?.request?.({ ...(data?.materials || {}), params: { ...paramsRequest, ...data?.initialParams } }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, paramsRequest, data?.availableToCall]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { paramsRequest, state, loading, getData, setParamsRequest, handleSearch, handlePaginationChange };
};

export const useDeleteTool = (data: {
  action: any;
  materials: { [key: string]: any };
  loadingAction: string;
  onSuccess: () => void;
}): {
  loading: boolean;
  handleDelete: () => void;
} => {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.loadingReducer[data.loadingAction]);

  const handleDelete = (): void => {
    dispatch(data?.action?.request(data?.materials, data?.onSuccess));
  };

  return { handleDelete, loading };
};

export const usePaginationLoadMoreOptionTool = (data: {
  actions: any;
  reducer: string;
  response: string;
  loadingAction: string;
  initialParams?: { [key: string]: any };
  availableToCall?: boolean;
}): {
  paramsRequest: {
    page: number;
    pageSize: number;
    sorter?: string;
    search?: string;
    [key: string]: any;
  };
  state: TCommonPaginate & { data: any };
  options: TSelectOption[];
  loading?: boolean;
  setOptions: (data: TSelectOption[]) => void;
  setParamsRequest: (data: any) => void;
  handleReset: () => void;
  handleLoadMore: () => void;
  handleSearch: (keyword?: string) => void;
} => {
  const dispatch = useDispatch();

  const state = useSelector((state: any) => state?.[data?.reducer]?.[data.response]);
  const total = state?.paginate?.total;

  const loading = useSelector((state: TRootState) => state.loadingReducer[data?.loadingAction]);

  const [options, setOptions] = useState<TSelectOption[]>([]);
  const [paramsRequest, setParamsRequest] = useState<{
    page: number;
    pageSize: number;
    sorter?: string;
    search?: string;
    [key: string]: any;
  }>({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const handleSearch = (keyword?: string): void => {
    setParamsRequest({
      ...paramsRequest,
      page: DEFAULT_PAGE,
      search: keyword || undefined,
    });
  };

  const handleLoadMore = (): void => {
    const isLoadMore = paramsRequest.page < getTotalPage(total, paramsRequest.pageSize);
    if (!loading && isLoadMore) {
      setParamsRequest({
        ...paramsRequest,
        page: paramsRequest.page + 1,
      });
    }
  };

  const handleReset = (): void => {
    setParamsRequest({
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  };

  const getData = useCallback(() => {
    const typeIsBoolean = typeof data?.availableToCall === 'boolean';

    if (!typeIsBoolean || (typeIsBoolean && data?.availableToCall)) {
      dispatch(
        data?.actions?.request(
          { params: { ...paramsRequest, ...data?.initialParams } },
          (fetchingResponse: any): void => {
            const isFirstFetching = paramsRequest.page === DEFAULT_PAGE;
            const dataFetching = fetchingResponse?.data?.map((item: any) => ({
              value: item.id,
              label: item.name,
              data: item,
            }));

            setOptions(isFirstFetching ? dataFetching : [...options, ...dataFetching]);
          },
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, paramsRequest, data?.availableToCall]);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    options,
    loading,
    paramsRequest,
    state,
    setOptions,
    setParamsRequest,
    handleReset,
    handleLoadMore,
    handleSearch,
  };
};

export const useModalState = (): [
  state: { [key: string]: any; visible: boolean },
  onOpen: (data?: { [key: string]: any }, dataKey?: { [key: string]: any }) => void,
  onClose: () => void,
] => {
  const [modalState, setModalState] = useState<any>({ visible: false });

  const handleOpenModal = (data?: { [key: string]: any }, dataKey?: { [key: string]: any }): void => {
    setModalState({ ...dataKey, visible: true, data });
  };

  const handleCloseModal = (): void => {
    setModalState({ visible: false });
  };

  return [modalState, handleOpenModal, handleCloseModal];
};

// export const useUploads = (): {
//   uploadsLoading: boolean;
//   handleUploadFiles: (file: File, cb?: (response: TUploadFilesResponse) => void) => void;
//   handleDeleteFiles: (ids: string, cb?: () => void) => void;
// } => {
//   const dispatch = useDispatch();

//   const uploadFilesLoading = useSelector((state: TRootState) => state.loadingReducer[EUploadFilesAction.UPLOAD_FILES]);
//   const deleteFilesLoading = useSelector((state: TRootState) => state.loadingReducer[EDeleteFilesAction.DELETE_FILES]);
//   const uploadsLoading = uploadFilesLoading || deleteFilesLoading;

//   const handleUploadFiles = (file: File, cb?: (response: TUploadFilesResponse) => void) => {
//     const formData = new FormData();
//     formData.append('files', file);
//     dispatch(uploadFilesAction.request({ body: formData }, cb));
//   };

//   const handleDeleteFiles = (ids: string, cb?: () => void) => {
//     dispatch(deleteFilesAction.request({ params: { ids } }, cb));
//   };

//   return { uploadsLoading, handleUploadFiles, handleDeleteFiles };
// };

export const useWarnIfUnsavedChanges = (unsavedChanges: boolean, callback: () => boolean): void => {
  useEffect(() => {
    if (unsavedChanges) {
      const routeChangeStart = () => {
        const ok = callback();
        if (!ok) {
          Router.events.emit('routeChangeComplete', () => {}, {});
          throw "Abort route change by user's confirmation.";
        }
      };

      Router.events.on('routeChangeStart', routeChangeStart);

      return () => {
        Router.events.off('routeChangeStart', routeChangeStart);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unsavedChanges]);
};
