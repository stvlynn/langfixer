import axios, { AxiosError } from 'axios'

const getApiSettings = () => {
  const apiKey = localStorage.getItem('apiKey')
  const apiUrl = localStorage.getItem('apiUrl') || 'https://api.dify.ai/v1/workflows/run'
  
  if (!apiKey) {
    throw new Error('API Key not found. Please configure it in Settings.')
  }
  
  return { apiKey, apiUrl }
}

export interface CheckLanguagesResponse {
  cn: string
  en: string
  jp: string
}

export type LanguageCode = 'zh-Hans' | 'en-US' | 'ja-JP'

export const checkLanguages = async (lang: LanguageCode, url: string): Promise<CheckLanguagesResponse> => {
  try {
    const { apiKey, apiUrl } = getApiSettings()
    
    const response = await axios.post(apiUrl, {
      inputs: { lang, url },
      response_mode: "blocking",
      user: "abc-123"
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 90000 // 90 seconds timeout
    })

    if (!response.data?.data?.outputs) {
      throw new Error('Invalid response format')
    }

    const outputs = response.data.data.outputs
    return {
      cn: outputs.cn || '',
      en: outputs.en || '',
      jp: outputs.jp || ''
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please try again.')
      }
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please check your API key.')
      }
      if (error.response?.status === 403) {
        throw new Error('Access forbidden. Please check your permissions.')
      }
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later.')
      }
      throw new Error(error.response?.data?.message || 'Network error occurred. Please check your connection and try again.')
    }
    throw new Error('An unexpected error occurred. Please try again.')
  }
}